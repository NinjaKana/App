/**
 * Premium Service - Gestion des abonnements et limites
 * Compatible Expo Go (RevenueCat désactivé en dev)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Mode production : RevenueCat activé (désactiver pour Expo Go)
const REVENUECAT_ENABLED = !__DEV__; // Activé en production, désactivé en dev

// RevenueCat (chargé dynamiquement si disponible)
let Purchases = null;
if (REVENUECAT_ENABLED) {
  try {
    Purchases = require('react-native-purchases').default;
  } catch (e) {
    console.log('RevenueCat not available');
  }
}

// Configuration RevenueCat
const REVENUECAT_API_KEY_IOS = 'appl_ksAVJyOAUYNwXmLducQRXtjvQLD';
const REVENUECAT_API_KEY_ANDROID = 'goog_vGuVjmSrhhHiwYRrbJQUQVXoHIO';

// Identifiants des produits
export const PRODUCT_IDS = {
  MONTHLY: 'ninjakana_pro_monthly',
  YEARLY: 'ninjakana_pro_yearly',
  LIFETIME: 'ninjakana_pro_lifetime',
};

// Prix affichés
export const DISPLAY_PRICES = {
  MONTHLY: '7,99 €',
  MONTHLY_PERIOD: '/mois',
  YEARLY: '39,99 €',
  YEARLY_PERIOD: '/an',
  YEARLY_MONTHLY_EQUIVALENT: '3,33 €/mois',
  YEARLY_SAVINGS: '58%',
  LIFETIME: '99,99 €',
  LIFETIME_PERIOD: 'une fois',
};

// Entitlements
export const ENTITLEMENTS = {
  PREMIUM: 'NinjaKana Pro',
};

// Limites pour utilisateurs gratuits
export const FREE_LIMITS = {
  EXERCISES_PER_DAY: 15,
  SRS_REVIEWS_PER_DAY: 10,
  LIVES_MAX: 5,
  KANJI_UNLOCKED: 20,
  AI_QUESTIONS_PER_DAY: 3,
};

// Limites pour utilisateurs premium
export const PREMIUM_LIMITS = {
  EXERCISES_PER_DAY: Infinity,
  SRS_REVIEWS_PER_DAY: Infinity,
  LIVES_MAX: Infinity,
  KANJI_UNLOCKED: Infinity,
  AI_QUESTIONS_PER_DAY: Infinity,
};

// Clés de stockage
const STORAGE_KEYS = {
  PREMIUM_STATUS: '@premium_status',
  DAILY_USAGE: '@daily_usage',
  LAST_RESET_DATE: '@last_reset_date',
};

/**
 * Initialiser RevenueCat
 */
export async function initializePurchases(userId = null) {
  if (!REVENUECAT_ENABLED || !Purchases) {
    console.log('[DEV] RevenueCat disabled (Expo Go mode)');
    return true;
  }

  try {
    const apiKey = Platform.OS === 'ios'
      ? REVENUECAT_API_KEY_IOS
      : REVENUECAT_API_KEY_ANDROID;

    await Purchases.configure({ apiKey });

    if (userId) {
      await Purchases.logIn(userId);
    }

    console.log('RevenueCat initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing RevenueCat:', error);
    return false;
  }
}

/**
 * Vérifier si l'utilisateur est premium
 */
export async function checkPremiumStatus() {
  try {
    // D'abord vérifier le cache local
    const cachedStatus = await AsyncStorage.getItem(STORAGE_KEYS.PREMIUM_STATUS);

    if (cachedStatus) {
      const parsed = JSON.parse(cachedStatus);
      // En mode dev, utiliser le cache
      if (!REVENUECAT_ENABLED || parsed.devMode) {
        return parsed.isPremium || false;
      }
    }

    // Si RevenueCat n'est pas activé, retourner false
    if (!REVENUECAT_ENABLED || !Purchases) {
      return false;
    }

    // Vérifier avec RevenueCat
    const customerInfo = await Purchases.getCustomerInfo();
    const isPremium = customerInfo.entitlements.active[ENTITLEMENTS.PREMIUM] !== undefined;

    // Mettre à jour le cache
    await AsyncStorage.setItem(STORAGE_KEYS.PREMIUM_STATUS, JSON.stringify({
      isPremium,
      lastChecked: Date.now(),
      expirationDate: customerInfo.entitlements.active[ENTITLEMENTS.PREMIUM]?.expirationDate,
    }));

    return isPremium;
  } catch (error) {
    console.error('Error checking premium status:', error);

    // Fallback sur le cache si erreur
    const cachedStatus = await AsyncStorage.getItem(STORAGE_KEYS.PREMIUM_STATUS);
    if (cachedStatus) {
      return JSON.parse(cachedStatus).isPremium;
    }

    return false;
  }
}

/**
 * Récupérer les offres disponibles
 */
export async function getOfferings() {
  if (!REVENUECAT_ENABLED || !Purchases) {
    return null;
  }

  try {
    const offerings = await Purchases.getOfferings();

    if (offerings.current !== null) {
      return {
        monthly: offerings.current.availablePackages.find(p => p.identifier === '$rc_monthly'),
        yearly: offerings.current.availablePackages.find(p => p.identifier === '$rc_annual'),
        lifetime: offerings.current.availablePackages.find(p => p.identifier === '$rc_lifetime'),
        all: offerings.current.availablePackages,
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting offerings:', error);
    return null;
  }
}

/**
 * Acheter un abonnement
 */
export async function purchasePackage(packageToPurchase) {
  if (!REVENUECAT_ENABLED || !Purchases) {
    return { success: false, error: 'Purchases not available in Expo Go' };
  }

  try {
    const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);
    const isPremium = customerInfo.entitlements.active[ENTITLEMENTS.PREMIUM] !== undefined;

    await AsyncStorage.setItem(STORAGE_KEYS.PREMIUM_STATUS, JSON.stringify({
      isPremium,
      lastChecked: Date.now(),
    }));

    return { success: true, isPremium };
  } catch (error) {
    if (error.userCancelled) {
      return { success: false, cancelled: true };
    }
    console.error('Error purchasing:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Restaurer les achats
 */
export async function restorePurchases() {
  if (!REVENUECAT_ENABLED || !Purchases) {
    return { success: false, error: 'Purchases not available in Expo Go' };
  }

  try {
    const customerInfo = await Purchases.restorePurchases();
    const isPremium = customerInfo.entitlements.active[ENTITLEMENTS.PREMIUM] !== undefined;

    await AsyncStorage.setItem(STORAGE_KEYS.PREMIUM_STATUS, JSON.stringify({
      isPremium,
      lastChecked: Date.now(),
    }));

    return { success: true, isPremium };
  } catch (error) {
    console.error('Error restoring purchases:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// GESTION DES LIMITES QUOTIDIENNES
// ============================================

async function getDailyUsage() {
  const today = new Date().toDateString();
  const lastResetDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_RESET_DATE);

  if (lastResetDate !== today) {
    const freshUsage = {
      exercisesCompleted: 0,
      srsReviews: 0,
      aiQuestions: 0,
      date: today,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_USAGE, JSON.stringify(freshUsage));
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_RESET_DATE, today);
    return freshUsage;
  }

  const usage = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_USAGE);
  return usage ? JSON.parse(usage) : {
    exercisesCompleted: 0,
    srsReviews: 0,
    aiQuestions: 0,
    date: today,
  };
}

async function saveDailyUsage(usage) {
  await AsyncStorage.setItem(STORAGE_KEYS.DAILY_USAGE, JSON.stringify(usage));
}

export async function canDoExercise() {
  const isPremium = await checkPremiumStatus();
  if (isPremium) return { allowed: true, remaining: Infinity };

  const usage = await getDailyUsage();
  const remaining = FREE_LIMITS.EXERCISES_PER_DAY - usage.exercisesCompleted;

  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    limit: FREE_LIMITS.EXERCISES_PER_DAY,
  };
}

export async function recordExerciseCompleted() {
  const usage = await getDailyUsage();
  usage.exercisesCompleted += 1;
  await saveDailyUsage(usage);
  return usage.exercisesCompleted;
}

export async function canDoSRSReview() {
  const isPremium = await checkPremiumStatus();
  if (isPremium) return { allowed: true, remaining: Infinity };

  const usage = await getDailyUsage();
  const remaining = FREE_LIMITS.SRS_REVIEWS_PER_DAY - usage.srsReviews;

  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    limit: FREE_LIMITS.SRS_REVIEWS_PER_DAY,
  };
}

export async function recordSRSReview() {
  const usage = await getDailyUsage();
  usage.srsReviews += 1;
  await saveDailyUsage(usage);
  return usage.srsReviews;
}

export async function isKanjiUnlocked(kanjiIndex) {
  const isPremium = await checkPremiumStatus();
  if (isPremium) return true;

  return kanjiIndex < FREE_LIMITS.KANJI_UNLOCKED;
}

export async function getMaxLives() {
  const isPremium = await checkPremiumStatus();
  return isPremium ? PREMIUM_LIMITS.LIVES_MAX : FREE_LIMITS.LIVES_MAX;
}

export async function getUserLimits() {
  const isPremium = await checkPremiumStatus();
  const usage = await getDailyUsage();

  if (isPremium) {
    return {
      isPremium: true,
      exercises: { used: usage.exercisesCompleted, limit: Infinity, remaining: Infinity },
      srsReviews: { used: usage.srsReviews, limit: Infinity, remaining: Infinity },
      maxLives: PREMIUM_LIMITS.LIVES_MAX,
      kanjiUnlocked: Infinity,
      aiQuestions: { used: usage.aiQuestions, limit: Infinity, remaining: Infinity },
    };
  }

  return {
    isPremium: false,
    exercises: {
      used: usage.exercisesCompleted,
      limit: FREE_LIMITS.EXERCISES_PER_DAY,
      remaining: Math.max(0, FREE_LIMITS.EXERCISES_PER_DAY - usage.exercisesCompleted),
    },
    srsReviews: {
      used: usage.srsReviews,
      limit: FREE_LIMITS.SRS_REVIEWS_PER_DAY,
      remaining: Math.max(0, FREE_LIMITS.SRS_REVIEWS_PER_DAY - usage.srsReviews),
    },
    maxLives: FREE_LIMITS.LIVES_MAX,
    kanjiUnlocked: FREE_LIMITS.KANJI_UNLOCKED,
    aiQuestions: {
      used: usage.aiQuestions,
      limit: FREE_LIMITS.AI_QUESTIONS_PER_DAY,
      remaining: Math.max(0, FREE_LIMITS.AI_QUESTIONS_PER_DAY - usage.aiQuestions),
    },
  };
}

// ============================================
// MODE DEV / TEST
// ============================================

export async function setDevPremiumStatus(isPremium) {
  if (__DEV__) {
    await AsyncStorage.setItem(STORAGE_KEYS.PREMIUM_STATUS, JSON.stringify({
      isPremium,
      lastChecked: Date.now(),
      devMode: true,
    }));
    console.log(`[DEV] Premium status set to: ${isPremium}`);
  }
}

export async function resetDailyUsage() {
  if (__DEV__) {
    await AsyncStorage.removeItem(STORAGE_KEYS.DAILY_USAGE);
    await AsyncStorage.removeItem(STORAGE_KEYS.LAST_RESET_DATE);
    console.log('[DEV] Daily usage reset');
  }
}

export default {
  initializePurchases,
  checkPremiumStatus,
  getOfferings,
  purchasePackage,
  restorePurchases,
  canDoExercise,
  recordExerciseCompleted,
  canDoSRSReview,
  recordSRSReview,
  isKanjiUnlocked,
  getMaxLives,
  getUserLimits,
  setDevPremiumStatus,
  resetDailyUsage,
  FREE_LIMITS,
  PREMIUM_LIMITS,
};
