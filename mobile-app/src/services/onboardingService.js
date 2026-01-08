/**
 * Onboarding Service - Gestion du tutoriel d'introduction
 *
 * IMPACT RETENTION: Un bon onboarding augmente D1 de 30-50%
 *
 * Étapes:
 * 1. Bienvenue et présentation
 * 2. Système de vies et streak
 * 3. Méthode SRS (répétition espacée)
 * 4. Badges et progression
 * 5. Objectif quotidien
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboarding_completed',
  ONBOARDING_STEP: 'onboarding_step',
  USER_GOAL: 'user_daily_goal',
  USER_LEVEL: 'user_initial_level',
};

// Slides de l'onboarding - Thème "Voie du Ninja"
export const ONBOARDING_SLIDES = [
  {
    id: 'welcome',
    emoji: '🥷',
    title: 'Bienvenue, Ninja !',
    subtitle: 'La Voie du Japonais',
    description:
      'Deviens un maître du japonais. De Genin à Hokage, ta progression commence ici.',
    highlight: '22 leçons • 100 kanji N5 • Audio japonais',
  },
  {
    id: 'method',
    emoji: '🧠',
    title: 'Technique du Clone',
    subtitle: 'Mémorisation SRS',
    description:
      'Notre jutsu de répétition espacée grave le japonais dans ta mémoire. Tu révises juste avant d\'oublier.',
    highlight: 'Mémorise 90% du contenu en 3x moins de temps',
  },
  {
    id: 'gamification',
    emoji: '🔥',
    title: 'Volonté du Feu',
    subtitle: 'Ta Flamme Quotidienne',
    description:
      'Maintiens ta flamme en pratiquant chaque jour. Le Bouclier Ninja te protège gratuitement !',
    highlight: '7 cœurs • Bouclier Ninja GRATUIT • Missions quotidiennes',
  },
  {
    id: 'ranks',
    emoji: '⚡',
    title: 'Rangs Ninja',
    subtitle: 'Genin → Hokage',
    description:
      'Accumule du Ki en t\'entraînant. Débloque 28 techniques légendaires : Sharingan, Super Saiyan, Ultra Instinct...',
    highlight: '8 rangs • 28 badges • 5 raretés',
  },
  {
    id: 'goal',
    emoji: '🎯',
    title: 'Ton entraînement',
    subtitle: 'Combien de temps par jour ?',
    description: 'Choisis ton rythme d\'entraînement quotidien au dojo.',
    isGoalSelection: true,
  },
];

// Options d'objectif quotidien - Thème Ninja
export const DAILY_GOALS = [
  {
    id: 'casual',
    minutes: 5,
    label: '5 min/jour',
    description: 'Genin débutant',
    emoji: '🌱',
  },
  {
    id: 'regular',
    minutes: 10,
    label: '10 min/jour',
    description: 'Entraînement Chūnin',
    emoji: '🥷',
    recommended: true,
  },
  {
    id: 'serious',
    minutes: 15,
    label: '15 min/jour',
    description: 'Discipline Jōnin',
    emoji: '⚔️',
  },
  {
    id: 'intense',
    minutes: 30,
    label: '30 min/jour',
    description: 'Mode Rock Lee',
    emoji: '🔥',
  },
];

// Options de niveau initial
export const INITIAL_LEVELS = [
  {
    id: 'beginner',
    label: 'Débutant complet',
    description: 'Je ne connais rien au japonais',
    emoji: '🌱',
    startLesson: 1,
  },
  {
    id: 'hiragana',
    label: 'Je connais les Hiragana',
    description: 'Les caractères de base',
    emoji: '🌿',
    startLesson: 10,
  },
  {
    id: 'katakana',
    label: 'Hiragana + Katakana',
    description: 'Les deux alphabets',
    emoji: '🌳',
    startLesson: 20,
  },
  {
    id: 'basic',
    label: 'Vocabulaire de base',
    description: 'Je connais ~100 mots',
    emoji: '⭐',
    startLesson: 30,
  },
];

/**
 * Vérifie si l'onboarding a été complété
 */
export const isOnboardingCompleted = async () => {
  try {
    const completed = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return completed === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

/**
 * Marque l'onboarding comme complété
 */
export const completeOnboarding = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    return { success: true };
  } catch (error) {
    console.error('Error completing onboarding:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Sauvegarde l'étape actuelle de l'onboarding
 */
export const saveOnboardingStep = async (step) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_STEP, String(step));
    return { success: true };
  } catch (error) {
    console.error('Error saving onboarding step:', error);
    return { success: false };
  }
};

/**
 * Récupère l'étape actuelle de l'onboarding
 */
export const getOnboardingStep = async () => {
  try {
    const step = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_STEP);
    return step ? parseInt(step, 10) : 0;
  } catch (error) {
    console.error('Error getting onboarding step:', error);
    return 0;
  }
};

/**
 * Sauvegarde l'objectif quotidien de l'utilisateur
 */
export const saveUserGoal = async (goalId) => {
  try {
    const goal = DAILY_GOALS.find((g) => g.id === goalId);
    if (!goal) return { success: false, error: 'Invalid goal' };

    await AsyncStorage.setItem(STORAGE_KEYS.USER_GOAL, JSON.stringify(goal));
    return { success: true, goal };
  } catch (error) {
    console.error('Error saving user goal:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Récupère l'objectif quotidien de l'utilisateur
 */
export const getUserGoal = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_GOAL);
    if (data) {
      return JSON.parse(data);
    }
    // Par défaut: 10 min/jour
    return DAILY_GOALS.find((g) => g.id === 'regular');
  } catch (error) {
    console.error('Error getting user goal:', error);
    return DAILY_GOALS.find((g) => g.id === 'regular');
  }
};

/**
 * Sauvegarde le niveau initial de l'utilisateur
 */
export const saveUserLevel = async (levelId) => {
  try {
    const level = INITIAL_LEVELS.find((l) => l.id === levelId);
    if (!level) return { success: false, error: 'Invalid level' };

    await AsyncStorage.setItem(STORAGE_KEYS.USER_LEVEL, JSON.stringify(level));
    return { success: true, level };
  } catch (error) {
    console.error('Error saving user level:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Récupère le niveau initial de l'utilisateur
 */
export const getUserLevel = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_LEVEL);
    if (data) {
      return JSON.parse(data);
    }
    return INITIAL_LEVELS[0]; // Débutant par défaut
  } catch (error) {
    console.error('Error getting user level:', error);
    return INITIAL_LEVELS[0];
  }
};

/**
 * Réinitialise l'onboarding (pour tests)
 */
export const resetOnboarding = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ONBOARDING_COMPLETED,
      STORAGE_KEYS.ONBOARDING_STEP,
      STORAGE_KEYS.USER_GOAL,
      STORAGE_KEYS.USER_LEVEL,
    ]);
    return { success: true };
  } catch (error) {
    console.error('Error resetting onboarding:', error);
    return { success: false, error: error.message };
  }
};

export default {
  ONBOARDING_SLIDES,
  DAILY_GOALS,
  INITIAL_LEVELS,
  isOnboardingCompleted,
  completeOnboarding,
  saveOnboardingStep,
  getOnboardingStep,
  saveUserGoal,
  getUserGoal,
  saveUserLevel,
  getUserLevel,
  resetOnboarding,
};
