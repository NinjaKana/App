/**
 * Premium Service - Gestion des abonnements et limites
 * Compatible Expo Go (RevenueCat désactivé en dev)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import i18n from '../i18n';
import { isPromoBonusActive } from './affiliateService';

// Mode production : RevenueCat activé (désactiver pour Expo Go)
const REVENUECAT_ENABLED = !__DEV__; // Activé en production, désactivé en dev

// RevenueCat (chargé dynamiquement si disponible)
let Purchases = null;
if (REVENUECAT_ENABLED) {
  try {
    Purchases = require('react-native-purchases').default;
  } catch (e) {
    // RevenueCat not available
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
  EXERCISES_PER_DAY: 25,
  SRS_REVIEWS_PER_DAY: 10,
  LIVES_MAX: 7,
  KANJI_UNLOCKED: 20,
  AI_QUESTIONS_PER_DAY: 3,
  FREE_LESSONS_PER_CATEGORY: 3,  // 3 premières leçons gratuites par catégorie
  // Bonus exercices
  AD_BONUS_EXERCISES: 10,       // +10 exercices par pub regardée
  AD_BONUS_MAX_PER_DAY: 3,     // Max 3 pubs/jour pour exercices
  SRS_BONUS_EXERCISES: 5,      // +5 exercices par session SRS
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
  BONUS_EXERCISES: '@bonus_exercises',
};

/**
 * Initialiser RevenueCat
 */
export async function initializePurchases(userId = null) {
  if (!REVENUECAT_ENABLED || !Purchases) {
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

    return true;
  } catch (error) {
    console.error('Error initializing RevenueCat:', error);
    return false;
  }
}

/**
 * Vérifier si l'utilisateur est premium
 * Inclut : abonnement RevenueCat OU bonus promo actif
 */
export async function checkPremiumStatus() {
  try {
    // Vérifier d'abord si un bonus promo est actif
    const promoBonusActive = await isPromoBonusActive();
    if (promoBonusActive) {
      return true;
    }

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
    return { useFallback: true };
  }

  try {
    const offerings = await Purchases.getOfferings();

    if (offerings.current !== null && offerings.current.availablePackages.length > 0) {
      const monthly = offerings.current.availablePackages.find(p =>
        p.identifier === '$rc_monthly' || p.packageType === 'MONTHLY'
      );
      const yearly = offerings.current.availablePackages.find(p =>
        p.identifier === '$rc_annual' || p.packageType === 'ANNUAL'
      );
      const lifetime = offerings.current.availablePackages.find(p =>
        p.identifier === '$rc_lifetime' || p.packageType === 'LIFETIME'
      );

      return {
        monthly,
        yearly,
        lifetime,
        all: offerings.current.availablePackages,
        useFallback: false,
      };
    }

    return { useFallback: true };
  } catch (error) {
    return { useFallback: true };
  }
}

/**
 * Acheter un produit par son ID (fallback mode)
 */
export async function purchaseProduct(productId) {
  if (!REVENUECAT_ENABLED || !Purchases) {
    return { success: false, error: 'Purchases not available' };
  }

  try {
    const products = await Purchases.getProducts([productId]);

    if (products.length === 0) {
      return { success: false, error: i18n.t('premium:productNotFound') };
    }

    const { customerInfo } = await Purchases.purchaseStoreProduct(products[0]);
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
    return { success: false, error: error.message };
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
  const bonus = await getBonusExercises();
  const totalAllowed = FREE_LIMITS.EXERCISES_PER_DAY + bonus.totalBonus;
  const remaining = totalAllowed - usage.exercisesCompleted;

  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    limit: totalAllowed,
    baseLimit: FREE_LIMITS.EXERCISES_PER_DAY,
    bonus: bonus.totalBonus,
    adBonusUsed: bonus.adBonusCount,
    adBonusMax: FREE_LIMITS.AD_BONUS_MAX_PER_DAY,
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

/**
 * Vérifie si une leçon est accessible gratuitement
 * @param {number} lessonIndex - Index de la leçon dans sa catégorie (0-based)
 * @returns {boolean} true si la leçon est gratuite
 */
export async function isLessonFree(lessonIndex) {
  const isPremium = await checkPremiumStatus();
  if (isPremium) return true;

  return lessonIndex < FREE_LIMITS.FREE_LESSONS_PER_CATEGORY;
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

  const bonus = await getBonusExercises();
  const totalLimit = FREE_LIMITS.EXERCISES_PER_DAY + bonus.totalBonus;

  return {
    isPremium: false,
    exercises: {
      used: usage.exercisesCompleted,
      limit: totalLimit,
      baseLimit: FREE_LIMITS.EXERCISES_PER_DAY,
      bonus: bonus.totalBonus,
      remaining: Math.max(0, totalLimit - usage.exercisesCompleted),
      adBonusUsed: bonus.adBonusCount,
      adBonusMax: FREE_LIMITS.AD_BONUS_MAX_PER_DAY,
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
// BONUS EXERCICES (PUB + SRS)
// ============================================

async function getBonusExercises() {
  const today = new Date().toDateString();
  const data = await AsyncStorage.getItem(STORAGE_KEYS.BONUS_EXERCISES);

  if (!data) {
    return { totalBonus: 0, adBonusCount: 0, srsBonusCount: 0, date: today };
  }

  const parsed = JSON.parse(data);
  // Reset si jour différent
  if (parsed.date !== today) {
    return { totalBonus: 0, adBonusCount: 0, srsBonusCount: 0, date: today };
  }

  return parsed;
}

async function saveBonusExercises(bonus) {
  await AsyncStorage.setItem(STORAGE_KEYS.BONUS_EXERCISES, JSON.stringify(bonus));
}

/**
 * Ajouter des exercices bonus via pub (reward ad)
 * Retourne le résultat avec le nombre d'exercices gagnés
 */
export async function addAdBonusExercises() {
  const bonus = await getBonusExercises();

  if (bonus.adBonusCount >= FREE_LIMITS.AD_BONUS_MAX_PER_DAY) {
    return {
      success: false,
      reason: 'ad_limit_reached',
      message: i18n.t('premium:adLimitReached', { max: FREE_LIMITS.AD_BONUS_MAX_PER_DAY }),
    };
  }

  bonus.adBonusCount += 1;
  bonus.totalBonus += FREE_LIMITS.AD_BONUS_EXERCISES;
  bonus.date = new Date().toDateString();
  await saveBonusExercises(bonus);

  return {
    success: true,
    exercisesAdded: FREE_LIMITS.AD_BONUS_EXERCISES,
    adBonusUsed: bonus.adBonusCount,
    adBonusMax: FREE_LIMITS.AD_BONUS_MAX_PER_DAY,
    totalBonus: bonus.totalBonus,
  };
}

/**
 * Ajouter des exercices bonus via révisions SRS
 */
export async function addSRSBonusExercises() {
  const bonus = await getBonusExercises();

  bonus.srsBonusCount += 1;
  bonus.totalBonus += FREE_LIMITS.SRS_BONUS_EXERCISES;
  bonus.date = new Date().toDateString();
  await saveBonusExercises(bonus);

  return {
    success: true,
    exercisesAdded: FREE_LIMITS.SRS_BONUS_EXERCISES,
    srsBonusCount: bonus.srsBonusCount,
    totalBonus: bonus.totalBonus,
  };
}

/**
 * Vérifier si l'utilisateur peut encore regarder une pub pour des exercices
 */
export async function canWatchAdForExercises() {
  const bonus = await getBonusExercises();
  return {
    canWatch: bonus.adBonusCount < FREE_LIMITS.AD_BONUS_MAX_PER_DAY,
    remaining: FREE_LIMITS.AD_BONUS_MAX_PER_DAY - bonus.adBonusCount,
    exercisesPerAd: FREE_LIMITS.AD_BONUS_EXERCISES,
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
  }
}

export async function resetDailyUsage() {
  if (__DEV__) {
    await AsyncStorage.removeItem(STORAGE_KEYS.DAILY_USAGE);
    await AsyncStorage.removeItem(STORAGE_KEYS.LAST_RESET_DATE);
  }
}

export default {
  initializePurchases,
  checkPremiumStatus,
  getOfferings,
  purchasePackage,
  purchaseProduct,
  restorePurchases,
  canDoExercise,
  recordExerciseCompleted,
  canDoSRSReview,
  recordSRSReview,
  isKanjiUnlocked,
  isLessonFree,
  getMaxLives,
  getUserLimits,
  addAdBonusExercises,
  addSRSBonusExercises,
  canWatchAdForExercises,
  setDevPremiumStatus,
  resetDailyUsage,
  FREE_LIMITS,
  PREMIUM_LIMITS,
  PRODUCT_IDS,
};
