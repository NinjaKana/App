/**
 * Lessons Screen - Nouveau Design Figma
 * Liste des leçons avec tabs catégories
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getProgress } from '../services/storage';
import {
  hiraganaLessons,
  katakanaLessons,
  vocabularyLessons,
  kanjiLessons,
  LESSON_CATEGORIES
} from '../data/lessonsData';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import globalStyles from '../styles/globalStyles';
import AdBanner from '../components/AdBanner';

export default function LessonsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(LESSON_CATEGORIES.HIRAGANA);
  const [completedLessons, setCompletedLessons] = useState([]);

  // Charger la progression à chaque focus de l'écran
  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [])
  );

  const loadProgress = async () => {
    const progress = await getProgress();
    setCompletedLessons(progress?.lessonsCompleted || []);
  };

  const categories = [
    { id: LESSON_CATEGORIES.HIRAGANA, name: 'Hiragana', char: 'あ', count: hiraganaLessons.length },
    { id: LESSON_CATEGORIES.KATAKANA, name: 'Katakana', char: 'ア', count: katakanaLessons.length },
    { id: LESSON_CATEGORIES.VOCABULARY, name: 'Vocabulaire', char: '言', count: vocabularyLessons.length },
    { id: LESSON_CATEGORIES.KANJI, name: 'Kanji', char: '漢', count: kanjiLessons.length },
  ];

  const getLessons = () => {
    switch (selectedCategory) {
      case LESSON_CATEGORIES.HIRAGANA:
        return hiraganaLessons;
      case LESSON_CATEGORIES.KATAKANA:
        return katakanaLessons;
      case LESSON_CATEGORIES.VOCABULARY:
        return vocabularyLessons;
      case LESSON_CATEGORIES.KANJI:
        return kanjiLessons;
      default:
        return [];
    }
  };

  // Vérifie si une leçon est débloquée
  const isLessonUnlocked = (lessons, index) => {
    // La première leçon de chaque catégorie est toujours débloquée
    if (index === 0) return true;

    // Les autres leçons sont débloquées si la précédente est complétée
    const previousLesson = lessons[index - 1];
    return completedLessons.includes(previousLesson.id);
  };

  // Vérifie si une leçon est complétée
  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const handleLessonPress = (lesson, index, lessons) => {
    if (!isLessonUnlocked(lessons, index)) {
      Alert.alert(
        '🔒 Leçon verrouillée',
        'Complète la leçon précédente pour débloquer celle-ci !',
        [{ text: 'Compris', style: 'default' }]
      );
      return;
    }

    navigation.navigate('LessonDetail', {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      category: selectedCategory,
    });
  };

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Leçons</Text>
          <Text style={styles.subtitle}>Choisis ce que tu veux apprendre</Text>
        </View>

        {/* Catégories - Design Figma avec tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryChar,
                selectedCategory === category.id && styles.categoryCharActive,
              ]}>
                {category.char}
              </Text>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.categoryNameActive,
                ]}
              >
                {category.name}
              </Text>
              <Text style={styles.categoryCount}>{category.count} leçons</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Liste des leçons - Design Figma */}
        <View style={styles.lessonsContainer}>
          {getLessons().length > 0 ? (
            getLessons().map((lesson, index) => {
              const lessons = getLessons();
              const unlocked = isLessonUnlocked(lessons, index);
              const completed = isLessonCompleted(lesson.id);

              return (
                <TouchableOpacity
                  key={lesson.id}
                  style={[
                    styles.lessonCard,
                    !unlocked && styles.lessonCardLocked,
                  ]}
                  onPress={() => handleLessonPress(lesson, index, lessons)}
                  activeOpacity={unlocked ? 0.7 : 0.5}
                >
                  {/* Icône avec état */}
                  <View style={[
                    styles.lessonIcon,
                    completed && styles.lessonIconCompleted,
                    !unlocked && styles.lessonIconLocked,
                  ]}>
                    <Text style={styles.lessonIconText}>
                      {!unlocked ? '🔒' : completed ? '✅' : '📗'}
                    </Text>
                  </View>

                  {/* Contenu */}
                  <View style={[styles.lessonContent, !unlocked && styles.lessonContentLocked]}>
                    <Text style={[styles.lessonNumber, !unlocked && styles.textLocked]}>
                      Leçon {index + 1}
                    </Text>
                    <Text style={[styles.lessonTitle, !unlocked && styles.textLocked]}>
                      {lesson.title}
                    </Text>
                    <Text style={[styles.lessonChars, !unlocked && styles.textLocked]} numberOfLines={1}>
                      {lesson.kanji
                        ? lesson.kanji.map(k => k.kanji).join(', ')
                        : lesson.characters?.map(c => c.hiragana || c.katakana || c.romaji).join(', ')
                      }
                    </Text>

                    {/* Tags */}
                    <View style={styles.lessonTags}>
                      <View style={[styles.tag, !unlocked && styles.tagLocked]}>
                        <Text style={[styles.tagText, !unlocked && styles.textLocked]}>
                          {lesson.kanji
                            ? `${lesson.kanji.length} kanji`
                            : `${lesson.characters?.length || 0} caractères`
                          }
                        </Text>
                      </View>
                      <View style={[styles.tag, !unlocked && styles.tagLocked]}>
                        <Text style={[styles.tagText, !unlocked && styles.textLocked]}>
                          {lesson.difficulty || 'Débutant'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Flèche ou cadenas */}
                  <Text style={[styles.lessonArrow, !unlocked && styles.textLocked]}>
                    {unlocked ? '›' : '🔒'}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                Aucune leçon disponible pour cette catégorie.
              </Text>
              <Text style={styles.emptySubtext}>
                Les leçons arrivent bientôt !
              </Text>
            </View>
          )}

          {/* Ad Banner */}
          <AdBanner style={styles.adBanner} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: SIZES.screenPadding,
    paddingBottom: SIZES.paddingSmall,
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  // Categories - Design Figma
  categoriesContainer: {
    marginBottom: SIZES.margin,
  },
  categoriesContent: {
    paddingHorizontal: SIZES.screenPadding,
    gap: SIZES.marginSmall,
  },
  categoryTab: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginRight: SIZES.marginSmall,
    alignItems: 'center',
    minWidth: 90,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryTabActive: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  categoryChar: {
    fontSize: 32,
    marginBottom: 4,
    color: COLORS.textSecondary,
  },
  categoryCharActive: {
    color: COLORS.text,
  },
  categoryName: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryNameActive: {
    color: COLORS.primary,
  },
  categoryCount: {
    fontSize: FONTS.tiny,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  // Lessons - Design Figma
  lessonsContainer: {
    padding: SIZES.screenPadding,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  lessonIconText: {
    fontSize: 24,
  },
  lessonContent: {
    flex: 1,
  },
  lessonNumber: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  lessonTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  lessonChars: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  lessonTags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSmall,
  },
  tagText: {
    fontSize: FONTS.tiny,
    color: COLORS.textMuted,
  },
  lessonArrow: {
    fontSize: 28,
    color: COLORS.textMuted,
    marginLeft: SIZES.marginSmall,
  },

  // Empty state
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
    marginTop: 8,
  },

  adBanner: {
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },

  // Styles pour les leçons verrouillées
  lessonCardLocked: {
    opacity: 0.6,
    backgroundColor: COLORS.surfaceDark,
  },
  lessonIconCompleted: {
    backgroundColor: COLORS.success,
  },
  lessonIconLocked: {
    backgroundColor: COLORS.surfaceLight,
  },
  lessonContentLocked: {
    opacity: 0.7,
  },
  textLocked: {
    color: COLORS.textMuted,
  },
  tagLocked: {
    backgroundColor: COLORS.surfaceDark,
  },
});
