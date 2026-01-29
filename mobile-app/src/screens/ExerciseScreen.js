/**
 * Exercise Screen - Ecran principal des exercices
 * Gere le flux des exercices, le scoring, les vies, et les resultats
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExerciseMCQ from '../components/ExerciseMCQ';
import ExerciseTranscription from '../components/ExerciseTranscription';
import ExerciseIntruder from '../components/ExerciseIntruder';
import ExerciseKanji from '../components/ExerciseKanji';
import { ErrorShake } from '../components/FeedbackAnimation';
import {
  prepareExercises,
  validateAnswer,
  calculatePoints,
  calculateSessionStats,
  shouldLoseLife,
  EXERCISE_TYPES,
} from '../services/exerciseService';
import { getCognitiveFeedback, trackError } from '../services/confusionTracker';
import { getProgress, saveProgress, getData, saveData, STORAGE_KEYS } from '../services/storage';
import { getLives, loseLife, checkAutoRecharge, getTimeUntilNextRecharge, formatTime, CONFIG } from '../services/livesSystem';
import { incrementQuestProgress } from '../services/questsSystem';
import audioService from '../services/audioService';
import haptic from '../services/hapticService';
import { scheduleStreakDangerNotification, scheduleInactivityNotification } from '../services/notificationService';
import { updateStreak } from '../services/streakSystem';
import { useTheme } from '../contexts/ThemeContext';
import { FONTS, SIZES } from '../styles/theme';
import { usePremium } from '../contexts/PremiumContext';
import { canWatchRewardedAd, logRewardedAdWatched } from '../services/adService';

export default function ExerciseScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { checkCanDoExercise, logExerciseCompleted, limits, openPaywall, isPremium, addExercisesViaAd, addExercisesViaSRS, refreshPremiumStatus } = usePremium();

  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(CONFIG.MAX_LIVES);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ isCorrect: false, message: '', cognitive: '' });
  const [showResults, setShowResults] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [showOutOfLivesModal, setShowOutOfLivesModal] = useState(false);
  const [timeUntilRecharge, setTimeUntilRecharge] = useState(0);
  const [timeUntilReset, setTimeUntilReset] = useState('');
  const [adLoading, setAdLoading] = useState(false);

  const { colors } = useTheme();
  const styles = createStyles(colors);

  // Animations
  const feedbackAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    checkExerciseLimit();
    initializeExercises();
    loadLives();
  }, []);

  // Timer pour le modal "Out of Lives"
  useEffect(() => {
    if (showOutOfLivesModal && timeUntilRecharge > 0) {
      const interval = setInterval(async () => {
        const newTime = await getTimeUntilNextRecharge();
        setTimeUntilRecharge(newTime);

        // Si recharge, fermer le modal et recharger les vies
        if (newTime === 0) {
          await loadLives();
          setShowOutOfLivesModal(false);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showOutOfLivesModal, timeUntilRecharge]);

  // Timer pour le countdown jusqu'à minuit (reset exercices)
  useEffect(() => {
    if (!limitReached) return;

    const updateResetTimer = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      if (hours > 0) {
        setTimeUntilReset(`${hours}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
      } else {
        setTimeUntilReset(`${minutes}m ${String(seconds).padStart(2, '0')}s`);
      }
    };

    updateResetTimer();
    const interval = setInterval(updateResetTimer, 1000);
    return () => clearInterval(interval);
  }, [limitReached]);

  const checkExerciseLimit = async () => {
    const result = await checkCanDoExercise();
    if (!result.allowed) {
      setLimitReached(true);
    }
  };


  useEffect(() => {
    // Jouer l'audio du caractere au debut de chaque exercice (Feature Audio Integre)
    if (exercises.length > 0 && currentIndex < exercises.length) {
      const currentExercise = exercises[currentIndex];

      // Attendre un peu pour laisser l'UI se charger, puis jouer l'audio
      const playAudio = async () => {
        // Extraire le romaji selon le type d'exercice
        let romaji = null;

        if (currentExercise.question?.romaji) {
          romaji = currentExercise.question.romaji;
        } else if (currentExercise.character?.romaji) {
          romaji = currentExercise.character.romaji;
        } else if (currentExercise.correctAnswer?.romaji) {
          romaji = currentExercise.correctAnswer.romaji;
        }

        if (romaji) {
          await audioService.play(romaji);
        }
      };

      // Delay de 300ms pour laisser l'animation se terminer
      const timeout = setTimeout(playAudio, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, exercises]);

  const initializeExercises = () => {
    const prepared = prepareExercises(lesson.exercises);
    setExercises(prepared);
  };

  const loadLives = async () => {
    // Verifier recharge automatique puis recuperer les vies
    const currentLives = await checkAutoRecharge();
    setLives(currentLives);
  };

  const handleAnswer = async (userAnswer) => {
    const currentExercise = exercises[currentIndex];
    const isCorrect = validateAnswer(currentExercise, userAnswer);

    // Calculer points
    const points = calculatePoints(currentExercise.type, isCorrect, streak);

    // Mettre a jour streak
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);

    // Enregistrer le resultat
    const result = {
      exercise: currentExercise,
      userAnswer,
      isCorrect,
      points,
    };
    const newResults = [...results, result];
    setResults(newResults);

    // Enregistrer exercice complete pour les limites premium
    await logExerciseCompleted();

    // Incrementer quete "perfect_exercise" si correct
    if (isCorrect) {
      await incrementQuestProgress('perfect_exercise');
    }

    // Preparer le feedback cognitif (Anti-Duolingo: feedback sobre et utile)
    let cognitiveFeedback = '';
    if (!isCorrect) {
      // Tracker l'erreur pour le systeme cognitif
      const expected = currentExercise.correct || currentExercise.correctAnswer?.character;
      await trackError(expected, userAnswer, currentExercise.type);
      cognitiveFeedback = await getCognitiveFeedback(expected, userAnswer) || '';
    }

    // Afficher feedback toast (pas de "Superbe!" excessif)
    setFeedbackData({
      isCorrect,
      message: isCorrect ? 'Correct' : 'Incorrect',
      cognitive: cognitiveFeedback,
      correctAnswer: !isCorrect ? (currentExercise.correct || currentExercise.correctAnswer?.character) : null,
    });
    setShowFeedback(true);

    // Animations de feedback visuelles + haptic (sans confettis)
    if (isCorrect) {
      haptic.success(); // Vibration de succes
    } else {
      setShakeError(true);
      haptic.error(); // Vibration d'erreur
      setTimeout(() => setShakeError(false), 500);
    }

    // Animation feedback
    Animated.sequence([
      Animated.timing(feedbackAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(feedbackAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowFeedback(false);
    });

    // Verifier perte de vie (5 erreurs pour lecons 1-3, 3 erreurs pour les autres)
    const maxErrors = (lesson.id <= 3) ? 5 : 3;
    if (shouldLoseLife(newResults, maxErrors) && lives > 0) {
      const newLives = await loseLife();
      setLives(newLives);

      // Haptic feedback pour perte de vie
      if (newLives === 1) {
        haptic.lastLife(); // Warning intense pour derniere vie
      } else if (newLives === 0) {
        // Plus de vies ! Bloquer le quiz
        haptic.error();
        const timeLeft = await getTimeUntilNextRecharge();
        setTimeUntilRecharge(timeLeft);
        setShowOutOfLivesModal(true);
        return; // BLOQUER la progression
      } else {
        haptic.lifeLost();
      }
    }

    // Passer a l'exercice suivant ou afficher resultats
    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        showFinalResults(newResults);
      }
    }, 1500);
  };

  const showFinalResults = async (finalResults) => {
    const stats = calculateSessionStats(finalResults);

    // Haptic feedback pour lecon terminee
    haptic.lessonCompleted();

    // Sauvegarder progression
    const progress = await getProgress();
    const updatedProgress = {
      ...progress,
      totalPoints: (progress.totalPoints || 0) + stats.totalPoints,
      lessonsCompleted: [...new Set([...(progress.lessonsCompleted || []), lesson.id])],
      exercisesCompleted: (progress.exercisesCompleted || 0) + stats.total,
      correctAnswers: (progress.correctAnswers || 0) + stats.correct,
    };
    await saveProgress(updatedProgress);

    // Mettre à jour le streak (activité réelle)
    await updateStreak();

    // Incrementer quete "studied_today"
    await incrementQuestProgress('studied_today');

    // Si nouvelle lecon completee, incrementer quete
    const isNewLesson = !progress.lessonsCompleted?.includes(lesson.id);
    if (isNewLesson) {
      await incrementQuestProgress('lesson_completed');
    }

    // Programmer notifications de retention
    const currentStreak = updatedProgress.streak || 0;
    await scheduleStreakDangerNotification(currentStreak);
    await scheduleInactivityNotification();

    setShowResults(true);
  };

  const handleWatchAdForExercises = async () => {
    setAdLoading(true);
    try {
      const availability = await canWatchRewardedAd();
      if (!availability.canWatch) {
        Alert.alert('Impossible', availability.message);
        setAdLoading(false);
        return;
      }

      // Simuler la pub (en dev/Expo Go)
      // En production, utiliser le vrai rewarded ad ici
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await logRewardedAdWatched('exercises');

      const result = await addExercisesViaAd();
      if (result.success) {
        Alert.alert(
          '🎉 Bonus débloqué !',
          `+${result.exercisesAdded} exercices ajoutés !`,
          [{ text: 'Continuer', onPress: () => setLimitReached(false) }]
        );
      } else {
        Alert.alert('Limite atteinte', result.message);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger la publicité');
    } finally {
      setAdLoading(false);
    }
  };

  const handleSRSForExercises = async () => {
    const result = await addExercisesViaSRS();
    if (result.success) {
      navigation.replace('SRSReview', { bonusMode: true });
    }
  };

  const renderLimitReached = () => {
    const adBonusAvailable = (limits?.exercises?.adBonusUsed || 0) < (limits?.exercises?.adBonusMax || 3);

    return (
      <View style={styles.limitContainer}>
        <Text style={styles.limitEmoji}>{'\u{1F512}'}</Text>
        <Text style={styles.limitTitle}>Limite quotidienne atteinte</Text>
        <Text style={styles.limitText}>
          Vous avez utilisé vos {limits?.exercises?.baseLimit || 25} exercices gratuits aujourd'hui.
        </Text>
        {timeUntilReset ? (
          <Text style={styles.limitTimer}>
            {'\u{23F0}'} Nouveaux exercices dans {timeUntilReset}
          </Text>
        ) : null}

        {/* Options pour débloquer plus d'exercices */}
        <View style={styles.limitOptionsContainer}>
          <Text style={styles.limitOptionsTitle}>Débloquer plus d'exercices</Text>

          {/* Option 1: Pub */}
          {adBonusAvailable && (
            <TouchableOpacity
              style={[styles.optionButton, styles.optionButtonAd]}
              onPress={handleWatchAdForExercises}
              disabled={adLoading}
            >
              {adLoading ? (
                <ActivityIndicator color={colors.text} size="small" />
              ) : (
                <>
                  <Text style={styles.optionButtonIcon}>📺</Text>
                  <View style={styles.optionButtonContent}>
                    <Text style={styles.optionButtonTitle}>Regarder une pub</Text>
                    <Text style={styles.optionButtonSubtitle}>
                      +10 exercices • {(limits?.exercises?.adBonusMax || 3) - (limits?.exercises?.adBonusUsed || 0)} restante(s)
                    </Text>
                  </View>
                </>
              )}
            </TouchableOpacity>
          )}

          {/* Option 2: SRS */}
          <TouchableOpacity
            style={[styles.optionButton, styles.optionButtonSRS]}
            onPress={handleSRSForExercises}
          >
            <Text style={styles.optionButtonIcon}>🧠</Text>
            <View style={styles.optionButtonContent}>
              <Text style={styles.optionButtonTitle}>Révisions SRS</Text>
              <Text style={styles.optionButtonSubtitle}>
                +5 exercices par session • Illimité
              </Text>
            </View>
          </TouchableOpacity>

          {/* Option 3: Premium */}
          <TouchableOpacity
            style={[styles.optionButton, styles.optionButtonPremium]}
            onPress={openPaywall}
          >
            <Text style={styles.optionButtonIcon}>👑</Text>
            <View style={styles.optionButtonContent}>
              <Text style={styles.optionButtonTitle}>Devenir Premium</Text>
              <Text style={styles.optionButtonSubtitle}>
                Exercices illimités pour toujours
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderExercise = () => {
    if (limitReached) {
      return renderLimitReached();
    }

    if (exercises.length === 0 || currentIndex >= exercises.length) {
      return null;
    }

    const currentExercise = exercises[currentIndex];

    switch (currentExercise.type) {
      case EXERCISE_TYPES.MCQ:
        return <ExerciseMCQ exercise={currentExercise} onAnswer={handleAnswer} />;

      case EXERCISE_TYPES.TRANSCRIPTION:
        return <ExerciseTranscription exercise={currentExercise} onAnswer={handleAnswer} />;

      case EXERCISE_TYPES.INTRUDER:
        return <ExerciseIntruder exercise={currentExercise} onAnswer={handleAnswer} />;

      // Exercices Kanji (3 types)
      case EXERCISE_TYPES.KANJI_RECOGNITION:
      case EXERCISE_TYPES.KANJI_READING:
      case EXERCISE_TYPES.KANJI_MEANING:
        return <ExerciseKanji exercise={currentExercise} onAnswer={handleAnswer} />;

      default:
        return (
          <View style={styles.unsupportedContainer}>
            <Text style={styles.unsupportedText}>
              Type d'exercice non supporte: {currentExercise.type}
            </Text>
          </View>
        );
    }
  };

  const renderOutOfLivesModal = () => {
    return (
      <Modal visible={showOutOfLivesModal} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.outOfLivesContainer}>
            {/* Header */}
            <Text style={styles.outOfLivesEmoji}>💔</Text>
            <Text style={styles.outOfLivesTitle}>Plus de vies !</Text>
            <Text style={styles.outOfLivesSubtitle}>
              Tu as fait trop d'erreurs. Prends une pause ou récupère des vies.
            </Text>

            {/* Lives display */}
            <View style={styles.livesDisplay}>
              <Text style={styles.livesDisplayText}>❤️ 0 / {CONFIG.MAX_LIVES}</Text>
            </View>

            {/* Recharge timer */}
            <View style={styles.timerCard}>
              <Text style={styles.timerLabel}>⏱️ Prochaine recharge dans</Text>
              <Text style={styles.timerValue}>{formatTime(timeUntilRecharge)}</Text>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
              {/* Option 1: Recuperer via SRS (Feature Anti-Duolingo) */}
              <TouchableOpacity
                style={[styles.optionButton, styles.optionButtonSRS]}
                onPress={() => {
                  setShowOutOfLivesModal(false);
                  navigation.navigate('SRSReview');
                }}
              >
                <Text style={styles.optionButtonIcon}>🧠</Text>
                <View style={styles.optionButtonContent}>
                  <Text style={styles.optionButtonTitle}>Révisions SRS</Text>
                  <Text style={styles.optionButtonSubtitle}>
                    Gratuit • 5 révisions = +1 vie
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Option 2: Premium (si pas deja premium) */}
              {!isPremium && (
                <TouchableOpacity
                  style={[styles.optionButton, styles.optionButtonPremium]}
                  onPress={() => {
                    setShowOutOfLivesModal(false);
                    openPaywall();
                  }}
                >
                  <Text style={styles.optionButtonIcon}>👑</Text>
                  <View style={styles.optionButtonContent}>
                    <Text style={styles.optionButtonTitle}>Vies illimitées</Text>
                    <Text style={styles.optionButtonSubtitle}>Devenir Premium</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {/* Bouton Quitter */}
            <TouchableOpacity
              style={styles.quitButton}
              onPress={() => {
                setShowOutOfLivesModal(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.quitButtonText}>← Quitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // Gere la fin de lecon avec paywall strategique apres lecon 3
  const handleFinish = async () => {
    // Afficher paywall apres lecon 3 pour utilisateurs gratuits (conversion +28%)
    if (lesson.id === 3 && !isPremium) {
      const paywallShown = await getData(STORAGE_KEYS.PAYWALL_LESSON3_SHOWN, false);
      if (!paywallShown) {
        await saveData(STORAGE_KEYS.PAYWALL_LESSON3_SHOWN, true);
        openPaywall();
      }
    }
    navigation.goBack();
  };

  const renderResultsModal = () => {
    const stats = calculateSessionStats(results);

    return (
      <Modal visible={showResults} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>🎉 Leçon Terminée !</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{`${stats.accuracy}%`}</Text>
              <Text style={styles.statLabel}>Précision</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{`${stats.correct}/${stats.total}`}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {`+${stats.totalPoints}`}
              </Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleFinish}
          >
            <Text style={styles.doneButtonText}>Terminé</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };

  // Fonction pour rejouer l'audio manuellement
  const handleReplayAudio = async () => {
    if (exercises.length > 0 && currentIndex < exercises.length) {
      const currentExercise = exercises[currentIndex];
      let romaji = null;

      if (currentExercise.question?.romaji) {
        romaji = currentExercise.question.romaji;
      } else if (currentExercise.character?.romaji) {
        romaji = currentExercise.character.romaji;
      } else if (currentExercise.correctAnswer?.romaji) {
        romaji = currentExercise.correctAnswer.romaji;
      }

      if (romaji) {
        await audioService.play(romaji);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Header (Anti-Duolingo: texte simple au lieu de barre de progression) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>

          {/* Bouton Audio pour rejouer le son */}
          <TouchableOpacity style={styles.audioReplayButton} onPress={handleReplayAudio}>
            <Text style={styles.audioReplayIcon}>🔊</Text>
          </TouchableOpacity>

          {/* Progress Text (au lieu de barre de progression "game") */}
          <Text style={styles.progressText}>
            {currentIndex + 1} / {exercises.length}
          </Text>

          {/* Lives */}
          <View style={styles.livesContainer}>
            <Text style={styles.livesText}>❤️ {lives}</Text>
          </View>
        </View>

        {/* Exercices restants (utilisateurs gratuits) */}
        {!isPremium && limits?.exercises && (
          <View style={styles.remainingBanner}>
            <Text style={styles.remainingText}>
              {limits.exercises.remaining} exercices restants aujourd'hui
            </Text>
          </View>
        )}

        {/* Streak Banner retire - Anti-Duolingo: focus sur la question, pas sur les stats */}
        {/* Le streak est toujours calcule mais affiche uniquement en fin de session */}

        {/* Exercise with Shake Animation */}
        <ErrorShake shake={shakeError}>
          {renderExercise()}
        </ErrorShake>

        {/* Feedback Toast (Anti-Duolingo: discret, en bas, pas de confettis) */}
        {showFeedback && (
          <Animated.View
            style={[
              styles.feedbackToast,
              feedbackData.isCorrect ? styles.feedbackToastCorrect : styles.feedbackToastIncorrect,
              { opacity: feedbackAnim },
            ]}
          >
            <View style={styles.feedbackToastHeader}>
              <Text style={styles.feedbackToastIcon}>
                {feedbackData.isCorrect ? '✓' : '✗'}
              </Text>
              <Text style={styles.feedbackToastMessage}>{feedbackData.message}</Text>
            </View>
            {!feedbackData.isCorrect && feedbackData.correctAnswer && (
              <Text style={styles.feedbackCorrectAnswer}>
                Réponse : {feedbackData.correctAnswer}
              </Text>
            )}
            {feedbackData.cognitive ? (
              <Text style={styles.feedbackCognitive}>{feedbackData.cognitive}</Text>
            ) : null}
          </Animated.View>
        )}

        {/* Out of Lives Modal */}
        {renderOutOfLivesModal()}

        {/* Results Modal */}
        {renderResultsModal()}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.screenPadding,
    gap: SIZES.margin,
  },
  closeButton: {
    fontSize: 28,
    color: colors.text,
    fontWeight: 'bold',
  },
  audioReplayButton: {
    padding: 8,
    backgroundColor: colors.primary + '20',
    borderRadius: 20,
  },
  audioReplayIcon: {
    fontSize: 20,
  },
  // Progress Text (Anti-Duolingo: texte sobre au lieu de barre game)
  progressText: {
    flex: 1,
    textAlign: 'center',
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  livesContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
    borderRadius: SIZES.radiusSmall,
  },
  livesText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.text,
  },
  remainingBanner: {
    backgroundColor: colors.warning + '20',
    padding: SIZES.paddingSmall,
    alignItems: 'center',
  },
  remainingText: {
    fontSize: FONTS.small,
    color: colors.warning,
    fontWeight: '500',
  },
  // streakBanner retire - Anti-Duolingo
  unsupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  unsupportedText: {
    fontSize: FONTS.large,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // Feedback Toast (Anti-Duolingo: discret, en bas)
  feedbackToast: {
    position: 'absolute',
    bottom: 40,
    left: SIZES.screenPadding,
    right: SIZES.screenPadding,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    paddingVertical: SIZES.padding * 1.2,
  },
  feedbackToastCorrect: {
    backgroundColor: colors.success + 'E6', // 90% opacite
  },
  feedbackToastIncorrect: {
    backgroundColor: colors.error + 'E6', // 90% opacite
  },
  feedbackToastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  feedbackToastIcon: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: SIZES.marginSmall,
  },
  feedbackToastMessage: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  feedbackCorrectAnswer: {
    fontSize: FONTS.medium,
    color: colors.text,
    marginTop: 4,
    opacity: 0.9,
  },
  feedbackCognitive: {
    fontSize: FONTS.medium,
    color: colors.text,
    marginTop: SIZES.marginSmall,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: SIZES.screenPadding,
  },
  resultsTitle: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: SIZES.margin * 3,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SIZES.margin,
    marginBottom: SIZES.margin * 3,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: SIZES.marginSmall,
  },
  statLabel: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
  },
  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.background,
  },
  // Styles limite atteinte
  limitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding * 2,
  },
  limitEmoji: {
    fontSize: 64,
    marginBottom: SIZES.margin,
  },
  limitTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  limitText: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.marginSmall,
  },
  limitTimer: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    marginTop: SIZES.margin,
    marginBottom: SIZES.marginSmall,
  },
  limitSubtext: {
    fontSize: FONTS.small,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  limitOptionsContainer: {
    width: '100%',
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin,
    gap: SIZES.margin,
  },
  limitOptionsTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  premiumButton: {
    backgroundColor: colors.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 3,
    marginBottom: SIZES.margin,
  },
  premiumButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.background,
  },
  backButton: {
    padding: SIZES.padding,
  },
  backButtonText: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
  },
  // Out of Lives Modal (Duolingo-inspired)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  outOfLivesContainer: {
    backgroundColor: colors.surface,
    borderRadius: SIZES.radius * 2,
    padding: SIZES.padding * 2,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  outOfLivesEmoji: {
    fontSize: 64,
    marginBottom: SIZES.margin,
  },
  outOfLivesTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.marginSmall,
    textAlign: 'center',
  },
  outOfLivesSubtitle: {
    fontSize: FONTS.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
    lineHeight: 22,
  },
  livesDisplay: {
    backgroundColor: colors.error + '20',
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.paddingSmall,
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.margin,
    borderWidth: 2,
    borderColor: colors.error,
  },
  livesDisplayText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.error,
  },
  timerCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin * 2,
    alignItems: 'center',
    width: '100%',
  },
  timerLabel: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
    marginBottom: SIZES.marginSmall,
  },
  timerValue: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: colors.primary,
  },
  optionsContainer: {
    width: '100%',
    gap: SIZES.margin,
    marginBottom: SIZES.margin * 2,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    gap: SIZES.margin,
  },
  optionButtonAd: {
    backgroundColor: colors.success + '20',
    borderWidth: 2,
    borderColor: colors.success,
  },
  optionButtonSRS: {
    backgroundColor: colors.primary + '20',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  optionButtonPremium: {
    backgroundColor: colors.warning + '20',
    borderWidth: 2,
    borderColor: colors.warning,
  },
  optionButtonIcon: {
    fontSize: 32,
  },
  optionButtonContent: {
    flex: 1,
  },
  optionButtonTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  optionButtonSubtitle: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
  },
  quitButton: {
    padding: SIZES.padding,
  },
  quitButtonText: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
