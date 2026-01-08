/**
 * Referral Service - Système de parrainage
 *
 * IMPACT VIRALITÉ: Le referral peut générer 20-40% des nouvelles acquisitions
 *
 * Fonctionnalités:
 * - Code de parrainage unique par utilisateur
 * - Suivi des invitations envoyées
 * - Récompenses pour le parrain et le filleul
 * - Partage via liens dynamiques
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Share, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const STORAGE_KEYS = {
  REFERRAL_CODE: 'referral_code',
  REFERRED_BY: 'referred_by',
  REFERRAL_COUNT: 'referral_count',
  REFERRAL_HISTORY: 'referral_history',
  REFERRAL_REWARDS: 'referral_rewards',
};

// Configuration des récompenses
export const REFERRAL_REWARDS = {
  // Récompenses pour le parrain (qui invite)
  referrer: {
    xp: 100,
    lives: 2,
    premiumDays: 3, // 3 jours de premium gratuit par filleul
  },
  // Récompenses pour le filleul (invité)
  referee: {
    xp: 50,
    lives: 3,
    premiumDays: 7, // 7 jours de premium gratuit à l'inscription
  },
  // Bonus pour 5 parrainages
  milestone5: {
    xp: 500,
    lives: 5,
    badge: 'social_butterfly',
  },
  // Bonus pour 10 parrainages
  milestone10: {
    xp: 1000,
    premiumDays: 30,
    badge: 'ambassador',
  },
};

// Messages de partage
const SHARE_MESSAGES = {
  default: {
    title: "J'apprends le japonais avec NinjaKana !",
    message:
      "Rejoins-moi sur NinjaKana ! 🥷🇯🇵\n\nUtilise mon code {CODE} pour recevoir 3 vies gratuites !",
  },
  streak: {
    title: 'Mon streak de {STREAK} jours !',
    message:
      "J'ai maintenu mon streak de {STREAK} jours sur NinjaKana ! 🔥\n\nRejoins-moi avec le code {CODE} pour 3 vies gratuites !",
  },
  badge: {
    title: "J'ai débloqué un nouveau badge !",
    message:
      "Je viens de débloquer le badge {BADGE} sur NinjaKana ! 🏆\n\nRejoins-moi avec le code {CODE}",
  },
  levelUp: {
    title: 'Niveau {LEVEL} atteint !',
    message:
      "J'ai atteint le niveau {LEVEL} sur NinjaKana ! 🎌\n\nViens apprendre avec moi, code : {CODE}",
  },
};

// URL de l'app
const APP_URL = 'https://ninjakana.github.io/App';
const STORE_URLS = {
  ios: 'https://apps.apple.com/app/ninjakana/idXXXXXX', // TODO: Après publication iOS
  android: 'https://play.google.com/store/apps/details?id=com.apprendre.japonais',
};

/**
 * Génère un code de parrainage unique
 */
const generateReferralCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Obtient ou génère le code de parrainage de l'utilisateur
 */
export const getReferralCode = async () => {
  try {
    let code = await AsyncStorage.getItem(STORAGE_KEYS.REFERRAL_CODE);

    if (!code) {
      code = generateReferralCode();
      await AsyncStorage.setItem(STORAGE_KEYS.REFERRAL_CODE, code);
    }

    return code;
  } catch (error) {
    console.error('Error getting referral code:', error);
    // Générer un code temporaire en cas d'erreur
    return generateReferralCode();
  }
};

/**
 * Obtient les statistiques de parrainage
 */
export const getReferralStats = async () => {
  try {
    const [code, count, history] = await Promise.all([
      getReferralCode(),
      AsyncStorage.getItem(STORAGE_KEYS.REFERRAL_COUNT),
      AsyncStorage.getItem(STORAGE_KEYS.REFERRAL_HISTORY),
    ]);

    return {
      code,
      totalReferrals: count ? parseInt(count, 10) : 0,
      history: history ? JSON.parse(history) : [],
      nextMilestone: getNextMilestone(count ? parseInt(count, 10) : 0),
    };
  } catch (error) {
    console.error('Error getting referral stats:', error);
    return {
      code: await getReferralCode(),
      totalReferrals: 0,
      history: [],
      nextMilestone: { target: 5, remaining: 5 },
    };
  }
};

/**
 * Calcule le prochain milestone
 */
const getNextMilestone = (currentCount) => {
  if (currentCount < 5) {
    return { target: 5, remaining: 5 - currentCount, reward: REFERRAL_REWARDS.milestone5 };
  }
  if (currentCount < 10) {
    return { target: 10, remaining: 10 - currentCount, reward: REFERRAL_REWARDS.milestone10 };
  }
  // Après 10, milestone tous les 10
  const nextTarget = Math.ceil((currentCount + 1) / 10) * 10;
  return { target: nextTarget, remaining: nextTarget - currentCount };
};

/**
 * Enregistre un nouveau parrainage (quand quelqu'un utilise notre code)
 */
export const recordReferral = async (refereeId = null) => {
  try {
    // Incrémenter le compteur
    const currentCount = await AsyncStorage.getItem(STORAGE_KEYS.REFERRAL_COUNT);
    const newCount = (currentCount ? parseInt(currentCount, 10) : 0) + 1;
    await AsyncStorage.setItem(STORAGE_KEYS.REFERRAL_COUNT, String(newCount));

    // Ajouter à l'historique
    const historyData = await AsyncStorage.getItem(STORAGE_KEYS.REFERRAL_HISTORY);
    const history = historyData ? JSON.parse(historyData) : [];
    history.push({
      date: new Date().toISOString(),
      refereeId,
      reward: REFERRAL_REWARDS.referrer,
    });
    await AsyncStorage.setItem(STORAGE_KEYS.REFERRAL_HISTORY, JSON.stringify(history));

    // Vérifier les milestones
    const milestoneReward = checkMilestoneReward(newCount);

    return {
      success: true,
      newCount,
      reward: REFERRAL_REWARDS.referrer,
      milestoneReward,
    };
  } catch (error) {
    console.error('Error recording referral:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Vérifie si un milestone est atteint
 */
const checkMilestoneReward = (count) => {
  if (count === 5) return REFERRAL_REWARDS.milestone5;
  if (count === 10) return REFERRAL_REWARDS.milestone10;
  return null;
};

/**
 * Enregistre le code du parrain (quand on est parrainé)
 */
export const setReferredBy = async (referrerCode) => {
  try {
    // Vérifier qu'on n'a pas déjà été parrainé
    const existingReferrer = await AsyncStorage.getItem(STORAGE_KEYS.REFERRED_BY);
    if (existingReferrer) {
      return { success: false, error: 'already_referred', message: 'Tu as déjà un parrain.' };
    }

    // Vérifier que ce n'est pas notre propre code
    const ourCode = await getReferralCode();
    if (referrerCode.toUpperCase() === ourCode) {
      return { success: false, error: 'own_code', message: 'Tu ne peux pas utiliser ton propre code.' };
    }

    // Sauvegarder le parrain
    await AsyncStorage.setItem(STORAGE_KEYS.REFERRED_BY, referrerCode.toUpperCase());

    return {
      success: true,
      reward: REFERRAL_REWARDS.referee,
      message: 'Code activé ! Tu as reçu tes récompenses.',
    };
  } catch (error) {
    console.error('Error setting referrer:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Vérifie si l'utilisateur a déjà un parrain
 */
export const hasReferrer = async () => {
  try {
    const referrer = await AsyncStorage.getItem(STORAGE_KEYS.REFERRED_BY);
    return !!referrer;
  } catch (error) {
    return false;
  }
};

/**
 * Construit le lien de partage
 */
export const buildShareLink = async () => {
  const code = await getReferralCode();
  const storeUrl = Platform.OS === 'ios' ? STORE_URLS.ios : STORE_URLS.android;
  return `${APP_URL}/invite?code=${code}\n\nTélécharge l'app : ${storeUrl}`;
};

/**
 * Partage le code de parrainage
 */
export const shareReferralCode = async (type = 'default', data = {}) => {
  try {
    const code = await getReferralCode();
    const messageTemplate = SHARE_MESSAGES[type] || SHARE_MESSAGES.default;

    let message = messageTemplate.message
      .replace('{CODE}', code)
      .replace('{STREAK}', data.streak || '')
      .replace('{BADGE}', data.badge || '')
      .replace('{LEVEL}', data.level || '');

    const title = messageTemplate.title
      .replace('{STREAK}', data.streak || '')
      .replace('{BADGE}', data.badge || '')
      .replace('{LEVEL}', data.level || '');

    const shareLink = await buildShareLink();
    const fullMessage = `${message}\n\n${shareLink}`;

    const result = await Share.share(
      {
        message: fullMessage,
        title,
      },
      {
        dialogTitle: title,
        subject: title,
      }
    );

    // Tracker le partage
    if (result.action === Share.sharedAction) {
      await trackShare(type);
      return { success: true, shared: true };
    }

    return { success: true, shared: false };
  } catch (error) {
    console.error('Error sharing referral code:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Copie le code dans le presse-papier
 */
export const copyReferralCode = async () => {
  try {
    const code = await getReferralCode();
    await Clipboard.setStringAsync(code);
    return { success: true, code };
  } catch (error) {
    console.error('Error copying referral code:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Copie le lien complet dans le presse-papier
 */
export const copyReferralLink = async () => {
  try {
    const link = await buildShareLink();
    await Clipboard.setStringAsync(link);
    return { success: true };
  } catch (error) {
    console.error('Error copying referral link:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Track les partages pour analytics
 */
const trackShare = async (type) => {
  try {
    const key = 'share_count';
    const countData = await AsyncStorage.getItem(key);
    const counts = countData ? JSON.parse(countData) : {};
    counts[type] = (counts[type] || 0) + 1;
    counts.total = (counts.total || 0) + 1;
    await AsyncStorage.setItem(key, JSON.stringify(counts));
  } catch (error) {
    console.error('Error tracking share:', error);
  }
};

/**
 * Récupère le nombre de partages
 */
export const getShareCount = async () => {
  try {
    const countData = await AsyncStorage.getItem('share_count');
    return countData ? JSON.parse(countData) : { total: 0 };
  } catch (error) {
    return { total: 0 };
  }
};

export default {
  getReferralCode,
  getReferralStats,
  recordReferral,
  setReferredBy,
  hasReferrer,
  buildShareLink,
  shareReferralCode,
  copyReferralCode,
  copyReferralLink,
  getShareCount,
  REFERRAL_REWARDS,
};
