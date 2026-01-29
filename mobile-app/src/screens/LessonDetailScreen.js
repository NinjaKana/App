/**
 * Lesson Detail Screen - Nouveau Design Figma
 * Détail d'une leçon avec liste de caractères et bouton exercices
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLessonById, hiraganaLessons, katakanaLessons, vocabularyLessons, kanjiLessons, LESSON_CATEGORIES } from '../data/lessonsData';
import audioService from '../services/audioService';
import { useTheme } from '../contexts/ThemeContext';
import { FONTS, SIZES } from '../styles/theme';
import KanjiCard from '../components/KanjiCard';
import GrammarTips from '../components/GrammarTips';
import FirstTimeLessonTip, { shouldShowFirstTimeTip, markFirstTimeTipAsShown } from '../components/FirstTimeLessonTip';
import { usePremium } from '../contexts/PremiumContext';
import { FREE_LIMITS } from '../services/premiumService';

export default function LessonDetailScreen({ route, navigation }) {
  const { lessonId, lessonTitle, category } = route.params;
  const lesson = getLessonById(lessonId);
  const { isPremium, openPaywall } = usePremium();
  const [playingRomaji, setPlayingRomaji] = useState(null);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [showGrammar, setShowGrammar] = useState(false);
  const [showFirstTimeTip, setShowFirstTimeTip] = useState(false);

  const { colors } = useTheme();
  const styles = createStyles(colors);

  // Vérifier si la leçon est gratuite
  const getLessonIndex = () => {
    const lessonsMap = {
      [LESSON_CATEGORIES.HIRAGANA]: hiraganaLessons,
      [LESSON_CATEGORIES.KATAKANA]: katakanaLessons,
      [LESSON_CATEGORIES.VOCABULARY]: vocabularyLessons,
      [LESSON_CATEGORIES.KANJI]: kanjiLessons,
    };
    const categoryLessons = lessonsMap[category] || [];
    return categoryLessons.findIndex(l => l.id === lessonId);
  };
  const lessonIndex = getLessonIndex();
  const isFree = isPremium || lessonIndex < FREE_LIMITS.FREE_LESSONS_PER_CATEGORY;

  // Vérifier si on doit afficher le conseil première fois
  useEffect(() => {
    checkFirstTimeTip();
  }, []);

  const checkFirstTimeTip = async () => {
    const shouldShow = await shouldShowFirstTimeTip();
    if (shouldShow) {
      // Attendre 500ms pour laisser l'écran se charger
      setTimeout(() => setShowFirstTimeTip(true), 500);
    }
  };

  const handleCloseTip = async () => {
    await markFirstTimeTipAsShown();
    setShowFirstTimeTip(false);
  };

  // Détermine si c'est une leçon de kanji
  const isKanjiLesson = lesson?.type === 'kanji' || lesson?.category === 'kanji';

  // Calcul du numéro de leçon depuis l'ID
  const getLessonNumber = () => {
    if (!lesson?.id) return 1;
    const idStr = String(lesson.id);
    if (idStr.includes('-')) {
      return parseInt(idStr.split('-').pop()) || 1;
    }
    return parseInt(idStr) || 1;
  };
  const lessonNumber = getLessonNumber();

  const handlePlayAudio = async (romaji) => {
    setPlayingRomaji(romaji);
    await audioService.play(romaji);
    setTimeout(() => setPlayingRomaji(null), 800);
  };

  if (!lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>📚</Text>
          <Text style={styles.errorText}>Leçon introuvable</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header - Design Figma */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrowText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{lesson.title}</Text>
            <Text style={styles.headerSubtitle}>
              Leçon {lessonNumber} • {lesson.difficulty || 'Débutant'}
            </Text>
          </View>
        </View>

        {/* Bouton Conseils - Design Figma */}
        <TouchableOpacity
          style={styles.tipsButton}
          onPress={() => setShowGrammar(true)}
        >
          <Text style={styles.tipsIcon}>💡</Text>
          <Text style={styles.tipsText}>Conseils & Explications</Text>
          <Text style={styles.tipsArrow}>›</Text>
        </TouchableOpacity>

        {/* Contenu selon le type de leçon */}
        {isKanjiLesson ? (
          /* Affichage Kanji */
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>
              🈳 Kanji ({lesson.kanji?.length || 0})
            </Text>

            {lesson.kanji && lesson.kanji.length > 0 && (
              <KanjiCard
                kanji={lesson.kanji[currentKanjiIndex]}
                showNavigation={true}
                currentIndex={currentKanjiIndex}
                totalCount={lesson.kanji.length}
                onNext={() => setCurrentKanjiIndex(prev => Math.min(prev + 1, lesson.kanji.length - 1))}
                onPrevious={() => setCurrentKanjiIndex(prev => Math.max(prev - 1, 0))}
              />
            )}

            {/* Grille de sélection kanji */}
            <View style={styles.kanjiGridContainer}>
              <Text style={styles.kanjiGridTitle}>Tous les kanji</Text>
              <View style={styles.kanjiGrid}>
                {lesson.kanji?.map((k, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.kanjiGridItem,
                      currentKanjiIndex === index && styles.kanjiGridItemActive,
                    ]}
                    onPress={() => setCurrentKanjiIndex(index)}
                  >
                    <Text style={[
                      styles.kanjiGridChar,
                      currentKanjiIndex === index && styles.kanjiGridCharActive,
                    ]}>
                      {k.kanji}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : (
          /* Affichage Hiragana/Katakana/Vocabulaire - Design Figma */
          <View style={styles.contentSection}>
            {lesson.characters?.map((char, index) => {
              const displayChar = char.hiragana || char.katakana || char.kanji || '?';
              const isPlaying = playingRomaji === char.romaji;

              return (
                <View key={index} style={styles.characterCard}>
                  {/* Box avec le caractère */}
                  <View style={styles.characterBox}>
                    <Text style={styles.characterMain}>{displayChar}</Text>
                  </View>

                  {/* Infos du caractère */}
                  <View style={styles.characterInfo}>
                    <Text style={styles.characterRomaji}>{char.romaji}</Text>

                    {/* Tip avec emoji */}
                    <View style={styles.characterTip}>
                      <Text style={styles.tipIcon}>💡</Text>
                      <Text style={styles.tipText} numberOfLines={2}>
                        {char.mnemonic || `Caractère ${displayChar}`}
                      </Text>
                    </View>
                  </View>

                  {/* Bouton audio */}
                  <TouchableOpacity
                    style={[styles.audioButton, isPlaying && styles.audioButtonPlaying]}
                    onPress={() => handlePlayAudio(char.romaji)}
                  >
                    <Text style={styles.audioIcon}>🔊</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}

        {/* Spacer pour le bouton fixe en bas */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bouton Commencer - Fixe en bas - Design Figma */}
      {lesson.exercises && lesson.exercises.length > 0 && (
        <View style={styles.bottomButtonContainer}>
          {isFree ? (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.navigate('Exercise', { lesson })}
            >
              <Text style={styles.startButtonText}>
                Commencer le quiz
              </Text>
              <Text style={styles.startButtonCount}>
                {lesson.exercises.length} exercices • {lesson.id <= 3 ? '5' : '3'} erreurs = -1 vie
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.startButton, styles.premiumButton]}
              onPress={openPaywall}
            >
              <Text style={styles.startButtonText}>
                👑 Débloquer avec Premium
              </Text>
              <Text style={styles.startButtonCount}>
                Accède à toutes les leçons
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Modal Conseils Grammaticaux */}
      <GrammarTips
        visible={showGrammar}
        onClose={() => setShowGrammar(false)}
        lessonType={lesson?.type || lesson?.category}
        lessonId={lessonId}
        lessonTitle={lesson?.title}
      />

      {/* Modal Première Fois - Comment utiliser une leçon */}
      <FirstTimeLessonTip
        visible={showFirstTimeTip}
        onClose={handleCloseTip}
        lessonId={lessonId}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  // Header - Design Figma
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.screenPadding,
    paddingBottom: SIZES.padding,
  },
  backArrow: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  backArrowText: {
    fontSize: 24,
    color: colors.text,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Tips Button - Design Figma
  tipsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.margin,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: colors.accent + '40',
  },
  tipsIcon: {
    fontSize: 20,
    marginRight: SIZES.marginSmall,
  },
  tipsText: {
    flex: 1,
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.accent,
  },
  tipsArrow: {
    fontSize: 24,
    color: colors.textMuted,
  },

  // Content Section
  contentSection: {
    paddingHorizontal: SIZES.screenPadding,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.margin,
  },

  // Character Card - Design Figma
  characterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  characterBox: {
    width: 64,
    height: 64,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  characterMain: {
    fontSize: 36,
    color: colors.text,
    fontWeight: '300',
  },
  characterInfo: {
    flex: 1,
  },
  characterRomaji: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  characterTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 14,
    marginRight: 6,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: FONTS.small,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // Audio Button - Design Figma
  audioButton: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radius,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButtonPlaying: {
    backgroundColor: colors.primary + '40',
  },
  audioIcon: {
    fontSize: 24,
  },

  // Bottom Button - Design Figma
  bottomSpacer: {
    height: 80,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.screenPadding,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.2,
    alignItems: 'center',
  },
  premiumButton: {
    backgroundColor: colors.warning,
  },
  startButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  startButtonCount: {
    fontSize: FONTS.small,
    color: colors.text + 'CC',
    marginTop: 2,
  },

  // Kanji Grid
  kanjiGridContainer: {
    marginTop: SIZES.margin,
    paddingTop: SIZES.margin,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  kanjiGridTitle: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    marginBottom: SIZES.marginSmall,
    textAlign: 'center',
  },
  kanjiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SIZES.marginSmall,
  },
  kanjiGridItem: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kanjiGridItemActive: {
    backgroundColor: colors.primary,
  },
  kanjiGridChar: {
    fontSize: 28,
    color: colors.text,
  },
  kanjiGridCharActive: {
    color: colors.text,
    fontWeight: 'bold',
  },

  // Error state
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: SIZES.margin,
  },
  errorText: {
    fontSize: FONTS.large,
    color: colors.textSecondary,
    marginBottom: SIZES.margin,
  },
  backButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  backButtonText: {
    fontSize: FONTS.medium,
    color: colors.primary,
    fontWeight: '600',
  },
});
