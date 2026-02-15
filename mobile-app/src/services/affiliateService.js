/**
 * Affiliate Service - Tracking des codes promo influenceurs
 * Stocke l'affiliate dans AsyncStorage + envoie à RevenueCat
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const STORAGE_KEYS = {
  AFFILIATE_CODE: '@affiliate_code',
  AFFILIATE_APPLIED_AT: '@affiliate_applied_at',
  PROMO_BONUS_EXPIRES: '@promo_bonus_expires',
};

// Codes promo valides (ajouter les nouveaux ici)
const VALID_PROMO_CODES = {
  SHYNE: { affiliate: 'shyne', bonusDays: 7 },
  // Ajouter d'autres codes ici
};

let Purchases = null;
const REVENUECAT_ENABLED = !__DEV__;

if (REVENUECAT_ENABLED) {
  try {
    Purchases = require('react-native-purchases').default;
  } catch (e) {
    // RevenueCat not available
  }
}

/**
 * Vérifie si un code promo est valide
 */
export function isValidPromoCode(code) {
  if (!code) return false;
  return Object.keys(VALID_PROMO_CODES).includes(code.toUpperCase().trim());
}

/**
 * Récupère les infos d'un code promo
 */
export function getPromoCodeInfo(code) {
  if (!code) return null;
  return VALID_PROMO_CODES[code.toUpperCase().trim()] || null;
}

/**
 * Applique un code promo
 * - Stocke l'affiliate localement
 * - Envoie l'attribut à RevenueCat
 * - Active le bonus premium temporaire
 */
export async function applyPromoCode(code) {
  const normalizedCode = code?.toUpperCase().trim();

  if (!normalizedCode) {
    return { success: false, error: 'invalid_code' };
  }

  const promoInfo = VALID_PROMO_CODES[normalizedCode];
  if (!promoInfo) {
    return { success: false, error: 'invalid_code' };
  }

  // Vérifier si un code a déjà été utilisé
  const existingCode = await AsyncStorage.getItem(STORAGE_KEYS.AFFILIATE_CODE);
  if (existingCode) {
    return { success: false, error: 'already_used', existingCode };
  }

  try {
    // Stocker le code localement
    await AsyncStorage.setItem(STORAGE_KEYS.AFFILIATE_CODE, normalizedCode);
    await AsyncStorage.setItem(STORAGE_KEYS.AFFILIATE_APPLIED_AT, new Date().toISOString());

    // Calculer et stocker la date d'expiration du bonus
    if (promoInfo.bonusDays > 0) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + promoInfo.bonusDays);
      await AsyncStorage.setItem(STORAGE_KEYS.PROMO_BONUS_EXPIRES, expiresAt.toISOString());
    }

    // Envoyer à RevenueCat
    await setAffiliateAttribute(promoInfo.affiliate);

    return {
      success: true,
      affiliate: promoInfo.affiliate,
      bonusDays: promoInfo.bonusDays,
    };
  } catch (error) {
    console.error('Error applying promo code:', error);
    return { success: false, error: 'unknown_error' };
  }
}

/**
 * Envoie l'attribut affiliate à RevenueCat
 */
async function setAffiliateAttribute(affiliate) {
  if (!REVENUECAT_ENABLED || !Purchases) {
    return;
  }

  try {
    await Purchases.setAttributes({
      affiliate: affiliate,
      affiliate_platform: Platform.OS,
      affiliate_date: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error setting affiliate attribute:', error);
  }
}

/**
 * Récupère le code promo appliqué (si existant)
 */
export async function getAppliedPromoCode() {
  try {
    const code = await AsyncStorage.getItem(STORAGE_KEYS.AFFILIATE_CODE);
    const appliedAt = await AsyncStorage.getItem(STORAGE_KEYS.AFFILIATE_APPLIED_AT);
    const bonusExpires = await AsyncStorage.getItem(STORAGE_KEYS.PROMO_BONUS_EXPIRES);

    if (!code) return null;

    return {
      code,
      appliedAt: appliedAt ? new Date(appliedAt) : null,
      bonusExpires: bonusExpires ? new Date(bonusExpires) : null,
      bonusActive: bonusExpires ? new Date(bonusExpires) > new Date() : false,
    };
  } catch (error) {
    console.error('Error getting applied promo code:', error);
    return null;
  }
}

/**
 * Vérifie si le bonus promo est actif
 */
export async function isPromoBonusActive() {
  try {
    const bonusExpires = await AsyncStorage.getItem(STORAGE_KEYS.PROMO_BONUS_EXPIRES);
    if (!bonusExpires) return false;
    return new Date(bonusExpires) > new Date();
  } catch (error) {
    return false;
  }
}

/**
 * Récupère le nombre de jours restants du bonus
 */
export async function getPromoBonusDaysRemaining() {
  try {
    const bonusExpires = await AsyncStorage.getItem(STORAGE_KEYS.PROMO_BONUS_EXPIRES);
    if (!bonusExpires) return 0;

    const expiresDate = new Date(bonusExpires);
    const now = new Date();

    if (expiresDate <= now) return 0;

    const diffTime = expiresDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    return 0;
  }
}

/**
 * Ajoute des jours de bonus Premium (utilisé par referral et promo)
 * Les jours s'additionnent si un bonus est déjà actif
 */
export async function addBonusPremiumDays(days, source = 'unknown') {
  if (days <= 0) return { success: false };

  try {
    const currentExpires = await AsyncStorage.getItem(STORAGE_KEYS.PROMO_BONUS_EXPIRES);
    let newExpires;

    if (currentExpires && new Date(currentExpires) > new Date()) {
      // Bonus actif : ajouter les jours à la date existante
      newExpires = new Date(currentExpires);
      newExpires.setDate(newExpires.getDate() + days);
    } else {
      // Pas de bonus actif : partir d'aujourd'hui
      newExpires = new Date();
      newExpires.setDate(newExpires.getDate() + days);
    }

    await AsyncStorage.setItem(STORAGE_KEYS.PROMO_BONUS_EXPIRES, newExpires.toISOString());

    return {
      success: true,
      daysAdded: days,
      expiresAt: newExpires,
      source,
    };
  } catch (error) {
    console.error('Error adding bonus premium days:', error);
    return { success: false, error: error.message };
  }
}

export default {
  isValidPromoCode,
  getPromoCodeInfo,
  applyPromoCode,
  getAppliedPromoCode,
  isPromoBonusActive,
  getPromoBonusDaysRemaining,
  addBonusPremiumDays,
};
