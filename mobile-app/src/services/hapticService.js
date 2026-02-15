/**
 * Haptic Service - Retour haptique pour améliorer l'UX
 *
 * IMPACT UX: Le feedback tactile renforce l'engagement
 * et rend l'app plus satisfaisante à utiliser
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Types de feedback disponibles:
 * - success: Bonne réponse, action réussie
 * - error: Mauvaise réponse, erreur
 * - warning: Attention, dernière vie
 * - light: Tap sur bouton
 * - medium: Sélection
 * - heavy: Action importante
 * - levelUp: Montée de niveau
 * - badge: Badge débloqué
 * - streak: Streak maintenu
 */

// Vérifier si on est sur un appareil qui supporte les haptics
const isHapticsSupported = Platform.OS === 'ios' || Platform.OS === 'android';

/**
 * Feedback de succès (bonne réponse)
 */
export const successFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Feedback d'erreur (mauvaise réponse)
 */
export const errorFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Feedback d'avertissement (dernière vie, etc.)
 */
export const warningFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Impact léger (tap sur bouton)
 */
export const lightImpact = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Impact moyen (sélection d'option)
 */
export const mediumImpact = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Impact fort (action importante)
 */
export const heavyImpact = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Sélection (changement de valeur dans un picker)
 */
export const selectionFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.selectionAsync();
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Pattern personnalisé pour level up
 * Double vibration de célébration
 */
export const levelUpFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await new Promise(resolve => setTimeout(resolve, 150));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await new Promise(resolve => setTimeout(resolve, 100));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Pattern pour badge débloqué
 */
export const badgeUnlockedFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await new Promise(resolve => setTimeout(resolve, 200));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Pattern pour streak maintenu
 */
export const streakFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise(resolve => setTimeout(resolve, 100));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Pattern pour perte de vie
 */
export const lifeLostFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    await new Promise(resolve => setTimeout(resolve, 200));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Pattern pour dernière vie (warning intense)
 */
export const lastLifeFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    await new Promise(resolve => setTimeout(resolve, 150));
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Pattern pour quête complétée
 */
export const questCompletedFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await new Promise(resolve => setTimeout(resolve, 100));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    // Haptic not available
  }
};

/**
 * Pattern pour leçon terminée
 */
export const lessonCompletedFeedback = async () => {
  if (!isHapticsSupported) return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await new Promise(resolve => setTimeout(resolve, 150));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise(resolve => setTimeout(resolve, 100));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    // Haptic not available
  }
};

export default {
  // Feedback de base
  success: successFeedback,
  error: errorFeedback,
  warning: warningFeedback,

  // Impacts
  light: lightImpact,
  medium: mediumImpact,
  heavy: heavyImpact,
  selection: selectionFeedback,

  // Patterns personnalisés
  levelUp: levelUpFeedback,
  badgeUnlocked: badgeUnlockedFeedback,
  streak: streakFeedback,
  lifeLost: lifeLostFeedback,
  lastLife: lastLifeFeedback,
  questCompleted: questCompletedFeedback,
  lessonCompleted: lessonCompletedFeedback,
};
