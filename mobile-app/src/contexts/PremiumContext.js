/**
 * Premium Context - Gestion globale du statut premium
 * Fournit l'état premium et les limites à toute l'application
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initializePurchases,
  checkPremiumStatus,
  getUserLimits,
  canDoExercise,
  recordExerciseCompleted,
  canDoSRSReview,
  recordSRSReview,
  isKanjiUnlocked,
  getMaxLives,
  addAdBonusExercises,
  addSRSBonusExercises,
  canWatchAdForExercises,
  setDevPremiumStatus,
  resetDailyUsage,
} from '../services/premiumService';

const PremiumContext = createContext();

export function PremiumProvider({ children, userId = null }) {
  const [isPremium, setIsPremium] = useState(false);
  const [limits, setLimits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaywall, setShowPaywall] = useState(false);

  // Initialisation - dépend de userId pour la configuration RevenueCat
  useEffect(() => {
    initializeApp();
  }, [userId]);

  const initializeApp = async () => {
    setLoading(true);
    try {
      // Initialiser RevenueCat
      await initializePurchases(userId);

      // Vérifier le statut premium
      const premiumStatus = await checkPremiumStatus();
      setIsPremium(premiumStatus);

      // Charger les limites
      const userLimits = await getUserLimits();
      setLimits(userLimits);
    } catch (error) {
      console.error('Error initializing premium:', error);
    }
    setLoading(false);
  };

  // Rafraîchir le statut
  const refreshPremiumStatus = useCallback(async () => {
    const premiumStatus = await checkPremiumStatus();
    setIsPremium(premiumStatus);
    const userLimits = await getUserLimits();
    setLimits(userLimits);
  }, []);

  // Vérifier si exercice possible
  const checkCanDoExercise = useCallback(async () => {
    const result = await canDoExercise();
    if (!result.allowed) {
      setShowPaywall(true);
    }
    return result;
  }, []);

  // Enregistrer exercice complété
  const logExerciseCompleted = useCallback(async () => {
    await recordExerciseCompleted();
    // Rafraîchir les limites
    const userLimits = await getUserLimits();
    setLimits(userLimits);
  }, []);

  // Vérifier si révision SRS possible
  const checkCanDoSRS = useCallback(async () => {
    const result = await canDoSRSReview();
    if (!result.allowed) {
      setShowPaywall(true);
    }
    return result;
  }, []);

  // Enregistrer révision SRS
  const logSRSReview = useCallback(async () => {
    await recordSRSReview();
    const userLimits = await getUserLimits();
    setLimits(userLimits);
  }, []);

  // Vérifier si kanji débloqué
  const checkKanjiUnlocked = useCallback(async (kanjiIndex) => {
    const unlocked = await isKanjiUnlocked(kanjiIndex);
    if (!unlocked) {
      setShowPaywall(true);
    }
    return unlocked;
  }, []);

  // Obtenir max vies
  const getMaxLivesCount = useCallback(async () => {
    return await getMaxLives();
  }, []);

  // Bonus exercices via pub
  const addExercisesViaAd = useCallback(async () => {
    const result = await addAdBonusExercises();
    if (result.success) {
      const userLimits = await getUserLimits();
      setLimits(userLimits);
    }
    return result;
  }, []);

  // Bonus exercices via SRS
  const addExercisesViaSRS = useCallback(async () => {
    const result = await addSRSBonusExercises();
    if (result.success) {
      const userLimits = await getUserLimits();
      setLimits(userLimits);
    }
    return result;
  }, []);

  // Vérifier si pub pour exercices dispo
  const checkCanWatchAdForExercises = useCallback(async () => {
    return await canWatchAdForExercises();
  }, []);

  // Ouvrir/fermer paywall
  const openPaywall = useCallback(() => {
    setShowPaywall(true);
  }, []);

  const closePaywall = useCallback(() => {
    setShowPaywall(false);
  }, []);

  // Handler après achat réussi
  const handlePurchaseSuccess = useCallback(async () => {
    await refreshPremiumStatus();
  }, [refreshPremiumStatus]);

  // DEV: Simuler premium
  const devSetPremium = useCallback(async (value) => {
    await setDevPremiumStatus(value);
    await refreshPremiumStatus();
  }, [refreshPremiumStatus]);

  // DEV: Reset quotidien
  const devResetDaily = useCallback(async () => {
    await resetDailyUsage();
    await refreshPremiumStatus();
  }, [refreshPremiumStatus]);

  const value = {
    // État
    isPremium,
    limits,
    loading,
    showPaywall,

    // Actions
    refreshPremiumStatus,
    checkCanDoExercise,
    logExerciseCompleted,
    checkCanDoSRS,
    logSRSReview,
    checkKanjiUnlocked,
    getMaxLivesCount,
    openPaywall,
    closePaywall,
    handlePurchaseSuccess,
    addExercisesViaAd,
    addExercisesViaSRS,
    checkCanWatchAdForExercises,

    // DEV
    devSetPremium,
    devResetDaily,
  };

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
}

// Hook personnalisé
export function usePremium() {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
}

export default PremiumContext;
