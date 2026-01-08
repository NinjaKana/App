/**
 * Ad Service - Configuration et gestion des publicités AdMob
 * Utilise react-native-google-mobile-ads
 *
 * MONÉTISATION: Rewarded Ads = +1 vie gratuite (impact revenue énorme)
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IDs de test Google (remplacer par vos vrais IDs en production)
const TEST_IDS = {
  BANNER: Platform.select({
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
  }),
  INTERSTITIAL: Platform.select({
    ios: 'ca-app-pub-3940256099942544/4411468910',
    android: 'ca-app-pub-3940256099942544/1033173712',
  }),
  REWARDED: Platform.select({
    ios: 'ca-app-pub-3940256099942544/1712485313',
    android: 'ca-app-pub-3940256099942544/5224354917',
  }),
};

// IDs de production NinjaKana
const PRODUCTION_IDS = {
  BANNER: Platform.select({
    ios: 'ca-app-pub-XXXX/YYYY', // TODO: Ajouter iOS
    android: 'ca-app-pub-7853846912857601/8766062594',
  }),
  INTERSTITIAL: Platform.select({
    ios: 'ca-app-pub-XXXX/YYYY', // TODO: Ajouter iOS
    android: 'ca-app-pub-7853846912857601/7195822446',
  }),
  REWARDED: Platform.select({
    ios: 'ca-app-pub-XXXX/YYYY', // TODO: Ajouter iOS
    android: 'ca-app-pub-7853846912857601/9945097100',
  }),
};

// Utiliser les IDs de test en développement
const IS_DEVELOPMENT = __DEV__;
const AD_IDS = IS_DEVELOPMENT ? TEST_IDS : PRODUCTION_IDS;

export const AdUnitIds = {
  banner: AD_IDS.BANNER,
  interstitial: AD_IDS.INTERSTITIAL,
  rewarded: AD_IDS.REWARDED,
};

// Storage keys pour les stats des ads
const STORAGE_KEYS = {
  REWARDED_ADS_WATCHED: 'rewarded_ads_watched',
  LAST_REWARDED_AD: 'last_rewarded_ad',
  REWARDED_COOLDOWN: 'rewarded_cooldown',
};

// Configuration des rewarded ads
export const REWARDED_CONFIG = {
  COOLDOWN_MS: 5 * 60 * 1000, // 5 minutes entre chaque pub récompensée
  MAX_PER_DAY: 10, // Maximum 10 pubs par jour
  REWARDS: {
    LIFE: { type: 'life', amount: 1, description: '+1 vie' },
    XP_BOOST: { type: 'xp', amount: 50, description: '+50 XP' },
  },
};

/**
 * Initialise les ads (à appeler au démarrage de l'app)
 */
export const initializeAds = async () => {
  try {
    // L'initialisation est automatique avec react-native-google-mobile-ads
    // Mais on peut configurer des options ici si besoin
    console.log('Ads initialized (using test IDs:', IS_DEVELOPMENT, ')');
    return true;
  } catch (error) {
    console.error('Failed to initialize ads:', error);
    return false;
  }
};

/**
 * Vérifie si l'utilisateur peut regarder une pub récompensée
 */
export const canWatchRewardedAd = async () => {
  try {
    // Vérifier le cooldown
    const lastWatched = await AsyncStorage.getItem(STORAGE_KEYS.LAST_REWARDED_AD);
    if (lastWatched) {
      const timeSince = Date.now() - parseInt(lastWatched, 10);
      if (timeSince < REWARDED_CONFIG.COOLDOWN_MS) {
        return {
          canWatch: false,
          reason: 'cooldown',
          remainingTime: REWARDED_CONFIG.COOLDOWN_MS - timeSince,
          message: 'Attendez avant de regarder une autre pub',
        };
      }
    }

    // Vérifier la limite quotidienne
    const todayCount = await getRewardedAdsWatchedToday();
    if (todayCount >= REWARDED_CONFIG.MAX_PER_DAY) {
      return {
        canWatch: false,
        reason: 'daily_limit',
        message: `Limite quotidienne atteinte (${REWARDED_CONFIG.MAX_PER_DAY}/jour)`,
      };
    }

    return {
      canWatch: true,
      remainingToday: REWARDED_CONFIG.MAX_PER_DAY - todayCount,
    };
  } catch (error) {
    console.error('Error checking rewarded ad availability:', error);
    return { canWatch: true }; // En cas d'erreur, permettre
  }
};

/**
 * Récupère le nombre de pubs récompensées regardées aujourd'hui
 */
export const getRewardedAdsWatchedToday = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.REWARDED_ADS_WATCHED);
    if (!data) return 0;

    const { count, date } = JSON.parse(data);
    const today = new Date().toDateString();

    // Reset si jour différent
    if (date !== today) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.REWARDED_ADS_WATCHED,
        JSON.stringify({ count: 0, date: today })
      );
      return 0;
    }

    return count;
  } catch (error) {
    console.error('Error getting rewarded ads count:', error);
    return 0;
  }
};

/**
 * Enregistre qu'une pub récompensée a été regardée
 */
export const logRewardedAdWatched = async (rewardType = 'life') => {
  try {
    const today = new Date().toDateString();
    const currentCount = await getRewardedAdsWatchedToday();

    // Mettre à jour le compteur
    await AsyncStorage.setItem(
      STORAGE_KEYS.REWARDED_ADS_WATCHED,
      JSON.stringify({ count: currentCount + 1, date: today })
    );

    // Enregistrer le timestamp
    await AsyncStorage.setItem(
      STORAGE_KEYS.LAST_REWARDED_AD,
      Date.now().toString()
    );

    return {
      success: true,
      adsWatchedToday: currentCount + 1,
      remainingToday: REWARDED_CONFIG.MAX_PER_DAY - (currentCount + 1),
    };
  } catch (error) {
    console.error('Error logging rewarded ad:', error);
    return { success: false };
  }
};

/**
 * Obtient le temps restant avant de pouvoir regarder une autre pub
 */
export const getRewardedAdCooldown = async () => {
  try {
    const lastWatched = await AsyncStorage.getItem(STORAGE_KEYS.LAST_REWARDED_AD);
    if (!lastWatched) return 0;

    const timeSince = Date.now() - parseInt(lastWatched, 10);
    const remaining = REWARDED_CONFIG.COOLDOWN_MS - timeSince;

    return Math.max(0, remaining);
  } catch (error) {
    console.error('Error getting rewarded ad cooldown:', error);
    return 0;
  }
};

/**
 * Formate le temps de cooldown
 */
export const formatCooldown = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${seconds}s`;
};

/**
 * Obtient les stats complètes des ads
 */
export const getAdStats = async () => {
  const todayCount = await getRewardedAdsWatchedToday();
  const cooldown = await getRewardedAdCooldown();
  const canWatch = await canWatchRewardedAd();

  return {
    rewarded: {
      watchedToday: todayCount,
      maxPerDay: REWARDED_CONFIG.MAX_PER_DAY,
      remainingToday: REWARDED_CONFIG.MAX_PER_DAY - todayCount,
      cooldownRemaining: cooldown,
      canWatch: canWatch.canWatch,
    },
  };
};

/**
 * Reset des stats (pour debug)
 */
export const resetAdStats = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.REWARDED_ADS_WATCHED);
    await AsyncStorage.removeItem(STORAGE_KEYS.LAST_REWARDED_AD);
    console.log('Ad stats reset');
  } catch (error) {
    console.error('Error resetting ad stats:', error);
  }
};

export default {
  AdUnitIds,
  initializeAds,
  IS_DEVELOPMENT,
  REWARDED_CONFIG,
  canWatchRewardedAd,
  getRewardedAdsWatchedToday,
  logRewardedAdWatched,
  getRewardedAdCooldown,
  formatCooldown,
  getAdStats,
  resetAdStats,
};
