/**
 * Review Service - Demande de note App Store / Play Store
 *
 * IMPACT VISIBILITÉ: Apps 4.5+ étoiles = 3x plus de téléchargements
 *
 * Stratégie Duolingo:
 * - Demander après un moment POSITIF (succès, streak, badge)
 * - Ne pas demander trop tôt (minimum 3 sessions)
 * - Ne pas harceler (max 2-3 demandes par an)
 * - Tracker si l'utilisateur a déjà noté
 *
 * INSTALLATION REQUISE:
 * npx expo install expo-store-review
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Alert } from 'react-native';

// Essayer d'importer expo-store-review
let StoreReview = null;
try {
  StoreReview = require('expo-store-review');
} catch (e) {
  // expo-store-review not installed
}

const STORAGE_KEYS = {
  REVIEW_DATA: 'review_data',
  HAS_REVIEWED: 'has_reviewed',
  LAST_PROMPT_DATE: 'last_review_prompt',
  PROMPT_COUNT: 'review_prompt_count',
};

// Configuration
const CONFIG = {
  // Minimum de sessions avant de demander
  MIN_SESSIONS: 3,
  // Minimum de jours depuis l'installation
  MIN_DAYS_INSTALLED: 3,
  // Minimum de leçons complétées
  MIN_LESSONS_COMPLETED: 2,
  // Minimum de streak
  MIN_STREAK: 2,
  // Délai minimum entre deux demandes (jours)
  DAYS_BETWEEN_PROMPTS: 60,
  // Maximum de demandes
  MAX_PROMPTS: 3,
};

// Moments optimaux pour demander
export const REVIEW_TRIGGERS = {
  LESSON_COMPLETE: 'lesson_complete',
  STREAK_MILESTONE: 'streak_milestone', // 7, 14, 30, 60, 100 jours
  BADGE_UNLOCKED: 'badge_unlocked',
  LEVEL_UP: 'level_up',
  PERFECT_SCORE: 'perfect_score', // 100% sur un exercice
  CHALLENGE_COMPLETE: 'challenge_complete',
};

// Milestones de streak qui déclenchent potentiellement une review
const STREAK_MILESTONES = [7, 14, 30, 60, 100, 365];

/**
 * Initialise ou récupère les données de review
 */
const getReviewData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.REVIEW_DATA);
    if (data) {
      return JSON.parse(data);
    }

    // Initialiser les données
    const initialData = {
      installDate: new Date().toISOString(),
      sessionCount: 0,
      lessonsCompleted: 0,
      hasReviewed: false,
      promptCount: 0,
      lastPromptDate: null,
      declinedCount: 0,
    };

    await AsyncStorage.setItem(STORAGE_KEYS.REVIEW_DATA, JSON.stringify(initialData));
    return initialData;
  } catch (error) {
    console.error('Error getting review data:', error);
    return null;
  }
};

/**
 * Met à jour les données de review
 */
const updateReviewData = async (updates) => {
  try {
    const current = await getReviewData();
    const updated = { ...current, ...updates };
    await AsyncStorage.setItem(STORAGE_KEYS.REVIEW_DATA, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error updating review data:', error);
    return null;
  }
};

/**
 * Incrémente le compteur de sessions
 * À appeler au lancement de l'app
 */
export const trackSession = async () => {
  const data = await getReviewData();
  if (data) {
    await updateReviewData({ sessionCount: data.sessionCount + 1 });
  }
};

/**
 * Incrémente le compteur de leçons
 */
export const trackLessonComplete = async () => {
  const data = await getReviewData();
  if (data) {
    await updateReviewData({ lessonsCompleted: data.lessonsCompleted + 1 });
  }
};

/**
 * Vérifie si on peut demander une review
 */
const canRequestReview = async () => {
  const data = await getReviewData();
  if (!data) return { canRequest: false, reason: 'no_data' };

  // Déjà noté
  if (data.hasReviewed) {
    return { canRequest: false, reason: 'already_reviewed' };
  }

  // Trop de demandes
  if (data.promptCount >= CONFIG.MAX_PROMPTS) {
    return { canRequest: false, reason: 'max_prompts_reached' };
  }

  // Pas assez de sessions
  if (data.sessionCount < CONFIG.MIN_SESSIONS) {
    return { canRequest: false, reason: 'not_enough_sessions' };
  }

  // Pas assez de leçons
  if (data.lessonsCompleted < CONFIG.MIN_LESSONS_COMPLETED) {
    return { canRequest: false, reason: 'not_enough_lessons' };
  }

  // Installé trop récemment
  const installDate = new Date(data.installDate);
  const daysSinceInstall = Math.floor(
    (Date.now() - installDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSinceInstall < CONFIG.MIN_DAYS_INSTALLED) {
    return { canRequest: false, reason: 'too_soon_after_install' };
  }

  // Dernière demande trop récente
  if (data.lastPromptDate) {
    const lastPrompt = new Date(data.lastPromptDate);
    const daysSincePrompt = Math.floor(
      (Date.now() - lastPrompt.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSincePrompt < CONFIG.DAYS_BETWEEN_PROMPTS) {
      return { canRequest: false, reason: 'too_soon_after_prompt' };
    }
  }

  return { canRequest: true };
};

/**
 * Vérifie si le moment est optimal pour demander
 */
const isOptimalMoment = (trigger, data = {}) => {
  switch (trigger) {
    case REVIEW_TRIGGERS.STREAK_MILESTONE:
      // Vérifier si c'est un milestone
      return STREAK_MILESTONES.includes(data.streak);

    case REVIEW_TRIGGERS.BADGE_UNLOCKED:
      // Les badges rares/légendaires sont de bons moments
      return ['rare', 'legendary', 'mythic'].includes(data.rarity);

    case REVIEW_TRIGGERS.LEVEL_UP:
      // Level up à partir du niveau 3
      return data.level >= 3;

    case REVIEW_TRIGGERS.PERFECT_SCORE:
      // Score parfait
      return true;

    case REVIEW_TRIGGERS.LESSON_COMPLETE:
      // Après 5+ leçons
      return data.totalLessons >= 5;

    case REVIEW_TRIGGERS.CHALLENGE_COMPLETE:
      return true;

    default:
      return false;
  }
};

/**
 * Demande une review à l'utilisateur
 * Retourne true si la review a été demandée
 */
export const requestReview = async (trigger = null, triggerData = {}) => {
  if (!StoreReview) {
    return { requested: false, reason: 'not_available' };
  }

  // Vérifier si on peut demander
  const { canRequest, reason } = await canRequestReview();
  if (!canRequest) {
    return { requested: false, reason };
  }

  // Vérifier si c'est un moment optimal
  if (trigger && !isOptimalMoment(trigger, triggerData)) {
    return { requested: false, reason: 'not_optimal_moment' };
  }

  try {
    // Vérifier si l'action est disponible sur cette plateforme
    const isAvailable = await StoreReview.isAvailableAsync();
    if (!isAvailable) {
      return { requested: false, reason: 'not_supported' };
    }

    // Demander la review
    await StoreReview.requestReview();

    // Mettre à jour les stats
    await updateReviewData({
      promptCount: (await getReviewData()).promptCount + 1,
      lastPromptDate: new Date().toISOString(),
    });

    return { requested: true };
  } catch (error) {
    console.error('Error requesting review:', error);
    return { requested: false, reason: 'error', error: error.message };
  }
};

/**
 * Marque que l'utilisateur a noté l'app
 * (Optionnel - on ne peut pas vraiment savoir)
 */
export const markAsReviewed = async () => {
  await updateReviewData({ hasReviewed: true });
};

/**
 * Demande une review avec un dialogue personnalisé d'abord
 * Approche "two-step" pour filtrer les utilisateurs mécontents
 */
export const requestReviewWithDialog = async (trigger = null, triggerData = {}) => {
  // Vérifier si on peut demander
  const { canRequest, reason } = await canRequestReview();
  if (!canRequest) {
    return { requested: false, reason };
  }

  // Vérifier le moment optimal
  if (trigger && !isOptimalMoment(trigger, triggerData)) {
    return { requested: false, reason: 'not_optimal_moment' };
  }

  return new Promise((resolve) => {
    Alert.alert(
      'Tu aimes apprendre le japonais ? 🇯🇵',
      'Ton avis nous aide énormément à améliorer l\'app !',
      [
        {
          text: 'Pas maintenant',
          style: 'cancel',
          onPress: async () => {
            await updateReviewData({
              declinedCount: (await getReviewData()).declinedCount + 1,
            });
            resolve({ requested: false, reason: 'declined' });
          },
        },
        {
          text: 'Donner mon avis',
          onPress: async () => {
            const result = await requestReview();
            resolve(result);
          },
        },
      ]
    );
  });
};

/**
 * Hook pour les moments de succès
 * À appeler après un événement positif
 */
export const onPositiveEvent = async (trigger, data = {}) => {
  // Tracker l'événement
  if (trigger === REVIEW_TRIGGERS.LESSON_COMPLETE) {
    await trackLessonComplete();
  }

  // Essayer de demander une review (silencieusement si pas le bon moment)
  return await requestReviewWithDialog(trigger, data);
};

/**
 * Vérifie si la review native est disponible
 */
export const isReviewAvailable = async () => {
  if (!StoreReview) return false;
  try {
    return await StoreReview.isAvailableAsync();
  } catch {
    return false;
  }
};

/**
 * Obtient les stats de review (pour debug)
 */
export const getReviewStats = async () => {
  return await getReviewData();
};

/**
 * Réinitialise les données de review (pour tests)
 */
export const resetReviewData = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.REVIEW_DATA);
};

export default {
  trackSession,
  trackLessonComplete,
  requestReview,
  requestReviewWithDialog,
  markAsReviewed,
  onPositiveEvent,
  isReviewAvailable,
  getReviewStats,
  resetReviewData,
  REVIEW_TRIGGERS,
};
