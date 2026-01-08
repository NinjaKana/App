/**
 * Share Service - Système de partage social
 *
 * VIRALITÉ: Le partage de streak est le meilleur moyen d'acquisition organique
 * Chaque partage = pub gratuite pour l'app
 */

import { Share, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentStreak, getHighestStreak } from './streakSystem';
import { getUserLevelData } from './levelSystem';
import { getBadgeProfileStats } from './badgesSystem';

const STORAGE_KEYS = {
  SHARE_COUNT: 'share_count',
  LAST_SHARE: 'last_share',
  SHARE_HISTORY: 'share_history',
};

// Configuration
export const SHARE_CONFIG = {
  APP_NAME: 'NinjaKana',
  APP_STORE_URL: Platform.select({
    ios: 'https://apps.apple.com/app/ninjakana/idXXXXXX', // TODO: Remplacer après publication iOS
    android: 'https://play.google.com/store/apps/details?id=com.apprendre.japonais',
  }),
  WEBSITE_URL: 'https://ninjakana.github.io/App/',
  HASHTAGS: ['NinjaKana', 'LearnJapanese', '日本語', 'Japonais', 'LanguageLearning'],
};

/**
 * Génère un message de partage pour le streak
 */
export const generateStreakShareMessage = async () => {
  const streak = await getCurrentStreak();
  const highestStreak = await getHighestStreak();
  const levelInfo = await getUserLevelData();
  const badgeStats = await getBadgeProfileStats();

  const emoji = getStreakEmoji(streak);
  const milestone = getStreakMilestone(streak);

  // Messages variés selon le streak
  let message = '';

  if (streak === 1) {
    message = `${emoji} Je viens de commencer à apprendre le japonais !\n\n🇯🇵 Premier jour de mon aventure linguistique !`;
  } else if (streak === 7) {
    message = `${emoji} 1 SEMAINE de japonais tous les jours !\n\n🎯 7 jours de streak - Je suis motivé(e) !`;
  } else if (streak === 30) {
    message = `${emoji} 1 MOIS d'apprentissage du japonais !\n\n⭐ 30 jours consécutifs - La régularité paie !`;
  } else if (streak === 100) {
    message = `${emoji} 100 JOURS de japonais !\n\n💎 Je suis officiellement accro à l'apprentissage !`;
  } else if (streak === 365) {
    message = `${emoji} 1 AN de japonais TOUS LES JOURS !\n\n👑 365 jours - Rien ne peut m'arrêter !`;
  } else if (streak >= 50) {
    message = `${emoji} ${streak} jours de japonais d'affilée !\n\n🏆 Niveau ${levelInfo.level} - ${levelInfo.title}`;
  } else if (streak >= 14) {
    message = `${emoji} ${streak} jours de streak en japonais !\n\n💪 L'habitude est en train de se former !`;
  } else {
    message = `${emoji} J'apprends le japonais depuis ${streak} jours !\n\n🔥 Mon streak continue !`;
  }

  // Ajouter stats optionnelles
  if (badgeStats.unlocked > 0) {
    message += `\n\n🏅 ${badgeStats.unlocked} badges débloqués`;
  }

  // Ajouter le call-to-action
  message += `\n\n📱 Rejoins-moi sur ${SHARE_CONFIG.APP_NAME} !`;
  message += `\n${SHARE_CONFIG.APP_STORE_URL}`;

  // Ajouter hashtags
  message += `\n\n#${SHARE_CONFIG.HASHTAGS.slice(0, 3).join(' #')}`;

  return {
    message,
    streak,
    milestone,
    emoji,
  };
};

/**
 * Génère un message de partage pour un badge
 */
export const generateBadgeShareMessage = (badge) => {
  const rarityLabels = {
    common: 'commun',
    uncommon: 'peu commun',
    rare: 'rare',
    legendary: 'légendaire',
    mythic: 'mythique',
  };

  const message = `🏆 Nouveau badge débloqué !\n\n` +
    `${badge.icon} ${badge.name}\n` +
    `"${badge.description}"\n\n` +
    `✨ Badge ${rarityLabels[badge.rarity]} !\n\n` +
    `📱 Apprends le japonais avec moi !\n` +
    `${SHARE_CONFIG.APP_STORE_URL}\n\n` +
    `#${SHARE_CONFIG.HASHTAGS[0]} #Achievement`;

  return message;
};

/**
 * Génère un message de partage pour un level up
 */
export const generateLevelUpShareMessage = (levelInfo) => {
  const message = `🎉 Level Up !\n\n` +
    `${levelInfo.emoji} Niveau ${levelInfo.level} - ${levelInfo.title}\n\n` +
    `📈 Je progresse en japonais !\n\n` +
    `📱 Rejoins l'aventure !\n` +
    `${SHARE_CONFIG.APP_STORE_URL}\n\n` +
    `#${SHARE_CONFIG.HASHTAGS[0]} #LevelUp`;

  return message;
};

/**
 * Partage le streak via le menu de partage natif
 */
export const shareStreak = async () => {
  try {
    const { message, streak, milestone } = await generateStreakShareMessage();

    const result = await Share.share(
      {
        message,
        title: `${streak} jours de japonais !`,
      },
      {
        dialogTitle: 'Partager mon streak',
        subject: `J'apprends le japonais depuis ${streak} jours !`,
      }
    );

    if (result.action === Share.sharedAction) {
      // L'utilisateur a partagé
      await logShare('streak', { streak, milestone });
      return { success: true, action: 'shared' };
    } else if (result.action === Share.dismissedAction) {
      // L'utilisateur a annulé
      return { success: false, action: 'dismissed' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sharing streak:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Partage un badge
 */
export const shareBadge = async (badge) => {
  try {
    const message = generateBadgeShareMessage(badge);

    const result = await Share.share(
      {
        message,
        title: `Badge ${badge.name} débloqué !`,
      },
      {
        dialogTitle: 'Partager mon badge',
      }
    );

    if (result.action === Share.sharedAction) {
      await logShare('badge', { badgeId: badge.id, badgeName: badge.name });
      return { success: true, action: 'shared' };
    }

    return { success: false, action: 'dismissed' };
  } catch (error) {
    console.error('Error sharing badge:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Partage un level up
 */
export const shareLevelUp = async (levelInfo) => {
  try {
    const message = generateLevelUpShareMessage(levelInfo);

    const result = await Share.share(
      {
        message,
        title: `Niveau ${levelInfo.level} atteint !`,
      },
      {
        dialogTitle: 'Partager mon niveau',
      }
    );

    if (result.action === Share.sharedAction) {
      await logShare('levelup', { level: levelInfo.level, title: levelInfo.title });
      return { success: true, action: 'shared' };
    }

    return { success: false, action: 'dismissed' };
  } catch (error) {
    console.error('Error sharing level up:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Enregistre un partage dans l'historique
 */
const logShare = async (type, data) => {
  try {
    const today = new Date().toDateString();

    // Mettre à jour le compteur
    const countData = await AsyncStorage.getItem(STORAGE_KEYS.SHARE_COUNT);
    const { count = 0, date } = countData ? JSON.parse(countData) : {};

    const newCount = date === today ? count + 1 : 1;
    await AsyncStorage.setItem(
      STORAGE_KEYS.SHARE_COUNT,
      JSON.stringify({ count: newCount, date: today })
    );

    // Enregistrer le timestamp
    await AsyncStorage.setItem(
      STORAGE_KEYS.LAST_SHARE,
      Date.now().toString()
    );

    // Ajouter à l'historique (garder les 50 derniers)
    const historyData = await AsyncStorage.getItem(STORAGE_KEYS.SHARE_HISTORY);
    const history = historyData ? JSON.parse(historyData) : [];

    history.unshift({
      type,
      data,
      timestamp: Date.now(),
    });

    await AsyncStorage.setItem(
      STORAGE_KEYS.SHARE_HISTORY,
      JSON.stringify(history.slice(0, 50))
    );
  } catch (error) {
    console.error('Error logging share:', error);
  }
};

/**
 * Récupère les stats de partage
 */
export const getShareStats = async () => {
  try {
    const today = new Date().toDateString();

    // Compteur du jour
    const countData = await AsyncStorage.getItem(STORAGE_KEYS.SHARE_COUNT);
    const { count = 0, date } = countData ? JSON.parse(countData) : {};
    const todayCount = date === today ? count : 0;

    // Dernier partage
    const lastShare = await AsyncStorage.getItem(STORAGE_KEYS.LAST_SHARE);

    // Historique
    const historyData = await AsyncStorage.getItem(STORAGE_KEYS.SHARE_HISTORY);
    const history = historyData ? JSON.parse(historyData) : [];

    // Total
    const totalShares = history.length;

    return {
      todayCount,
      lastShare: lastShare ? parseInt(lastShare, 10) : null,
      totalShares,
      history: history.slice(0, 10), // Les 10 derniers
    };
  } catch (error) {
    console.error('Error getting share stats:', error);
    return {
      todayCount: 0,
      lastShare: null,
      totalShares: 0,
      history: [],
    };
  }
};

/**
 * Emoji basé sur le streak
 */
const getStreakEmoji = (streak) => {
  if (streak >= 365) return '👑';
  if (streak >= 200) return '🏆';
  if (streak >= 100) return '💎';
  if (streak >= 50) return '🎯';
  if (streak >= 30) return '⭐';
  if (streak >= 14) return '💪';
  if (streak >= 7) return '🔥';
  return '🌱';
};

/**
 * Milestone du streak
 */
const getStreakMilestone = (streak) => {
  if (streak >= 365) return '1 year';
  if (streak >= 100) return '100 days';
  if (streak >= 30) return '1 month';
  if (streak >= 7) return '1 week';
  return null;
};

/**
 * Reset (pour debug)
 */
export const resetShareStats = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.SHARE_COUNT);
    await AsyncStorage.removeItem(STORAGE_KEYS.LAST_SHARE);
    await AsyncStorage.removeItem(STORAGE_KEYS.SHARE_HISTORY);
    console.log('Share stats reset');
  } catch (error) {
    console.error('Error resetting share stats:', error);
  }
};

export default {
  SHARE_CONFIG,
  generateStreakShareMessage,
  generateBadgeShareMessage,
  generateLevelUpShareMessage,
  shareStreak,
  shareBadge,
  shareLevelUp,
  getShareStats,
  resetShareStats,
};
