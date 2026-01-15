/**
 * Storage Service - Remplace localStorage par AsyncStorage
 * Gère toutes les opérations de stockage de l'app
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Clés de stockage (identiques à la version web pour compatibilité)
export const STORAGE_KEYS = {
  PROGRESS: 'japonais_progress',
  SRS_CARDS: 'srs_cards_v1',
  LIVES: 'japaneseApp_lives',
  QUESTS: 'japaneseApp_quests',
  SRS_INITIALIZED: 'srs_initialized',
  SRS_HISTORY: 'srs_review_history',
  VIEWED_PHRASES: 'viewedPhrases',
  LAST_CHALLENGE: 'lastChallengeCompleted',
  TOTAL_CHALLENGES: 'totalChallengesCompleted',
  USERNAME: 'japonais_username',
  USER_ID: 'japonais_user_id',
  LEADERBOARD: 'leaderboard_local',
  DAILY_XP: 'dailyXP',
  TOTAL_SCORE: 'totalScore',
  QUESTION_COUNT: 'japonais_question_count',
  SWIPE_HINT: 'swipe_hint_shown',
  LIVES_RECOVERY_COOLDOWN: 'lives_recovery_cooldown',
  LIVES_DAILY_RECOVERIES: 'lives_daily_recoveries',
  STREAK_GRACE: 'streak_grace',
  PAYWALL_LESSON3_SHOWN: 'paywall_lesson3_shown',
};

/**
 * Sauvegarde une valeur dans AsyncStorage
 * @param {string} key - Clé de stockage
 * @param {any} value - Valeur à sauvegarder (sera stringifiée en JSON)
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    return false;
  }
};

/**
 * Récupère une valeur depuis AsyncStorage
 * @param {string} key - Clé de stockage
 * @param {any} defaultValue - Valeur par défaut si la clé n'existe pas
 * @returns {Promise<any>} Valeur parsée ou valeur par défaut
 */
export const getData = async (key, defaultValue = null) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (error) {
    console.error(`Error getting data for key ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Supprime une valeur de AsyncStorage
 * @param {string} key - Clé de stockage
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    return false;
  }
};

/**
 * Supprime toutes les données (reset complet)
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

/**
 * Récupère toutes les clés stockées
 */
export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

// === HELPERS SPÉCIFIQUES POUR LES DONNÉES DE L'APP ===

/**
 * Récupère la progression de l'utilisateur
 */
export const getProgress = async () => {
  return await getData(STORAGE_KEYS.PROGRESS, {
    level: 1,
    totalPoints: 0,
    streak: 0,
    lastStudyDate: null,
    lessons: {},
    badges: [],
    stats: {
      lessonsCompleted: 0,
      transcriptionsCompleted: 0,
      wordsLearned: 0,
    },
  });
};

/**
 * Sauvegarde la progression de l'utilisateur
 */
export const saveProgress = async (progress) => {
  return await saveData(STORAGE_KEYS.PROGRESS, progress);
};

/**
 * Récupère les cartes SRS
 */
export const getSRSCards = async () => {
  return await getData(STORAGE_KEYS.SRS_CARDS, []);
};

/**
 * Sauvegarde les cartes SRS
 */
export const saveSRSCards = async (cards) => {
  return await saveData(STORAGE_KEYS.SRS_CARDS, cards);
};

/**
 * Récupère l'état du système de vies
 */
export const getLives = async () => {
  return await getData(STORAGE_KEYS.LIVES, {
    lives: 7,
    lastUpdate: Date.now(),
    version: 2,
  });
};

/**
 * Sauvegarde l'état du système de vies
 */
export const saveLives = async (livesData) => {
  return await saveData(STORAGE_KEYS.LIVES, livesData);
};

/**
 * Récupère l'état des quêtes
 */
export const getQuests = async () => {
  return await getData(STORAGE_KEYS.QUESTS, {
    completedToday: [],
    completedThisWeek: [],
    completedMain: [],
    lastDailyReset: Date.now(),
    lastWeeklyReset: Date.now(),
    questProgress: {},
  });
};

/**
 * Sauvegarde l'état des quêtes
 */
export const saveQuests = async (questsData) => {
  return await saveData(STORAGE_KEYS.QUESTS, questsData);
};

/**
 * Initialise les données par défaut pour un nouvel utilisateur
 */
export const initializeDefaultData = async () => {
  try {
    const progress = await getProgress();

    // Si l'utilisateur n'a pas d'ID, en créer un
    if (!progress.userId) {
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      progress.userId = userId;
      await saveData(STORAGE_KEYS.USER_ID, userId);
    }

    await saveProgress(progress);
    return true;
  } catch (error) {
    console.error('Error initializing default data:', error);
    return false;
  }
};

export default {
  saveData,
  getData,
  removeData,
  clearAll,
  getAllKeys,
  getProgress,
  saveProgress,
  getSRSCards,
  saveSRSCards,
  getLives,
  saveLives,
  getQuests,
  saveQuests,
  initializeDefaultData,
  STORAGE_KEYS,
};
