/**
 * Home Screen - Nouveau Design Figma
 * Dashboard avec stats, calendrier et quêtes
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import { getLives, gainLife } from '../services/livesSystem';
import { getAllCards, getCardsForReview } from '../services/srsSystem';
import { getDailyQuests } from '../services/questsSystem';
import { getCurrentStreak, updateStreak } from '../services/streakSystem';
import { getProgress } from '../services/storage';
import LivesRecoveryModal from '../components/LivesRecoveryModal';
import AdBanner from '../components/AdBanner';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState(7);
  const [reviewCount, setReviewCount] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [dailyQuests, setDailyQuests] = useState([]);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalKi, setTotalKi] = useState(0);

  // Jours de la semaine pour le calendrier
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday...
  const todayIndex = today === 0 ? 6 : today - 1; // Convertir pour commencer par lundi

  const loadData = async () => {
    try {
      setLoading(true);

      const [currentLives, cards, cardsToReview, quests, progress] =
        await Promise.all([
          getLives(),
          getAllCards(),
          getCardsForReview(),
          getDailyQuests(),
          getProgress(),
        ]);

      setLives(currentLives);
      setTotalCards(cards.length);
      setReviewCount(cardsToReview.length);
      setDailyQuests(quests);
      setTotalKi(progress?.totalPoints || 0);

      // Mettre à jour le streak
      await updateStreak();
      const streak = await getCurrentStreak();
      setCurrentStreak(streak);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleLifeRecovered = async () => {
    const newLives = await gainLife();
    setLives(newLives);
  };

  // Calculer le rang basé sur Ki
  const getRank = (ki) => {
    if (ki < 500) return { name: 'Genin', kanji: '下忍' };
    if (ki < 1000) return { name: 'Chunin', kanji: '中忍' };
    if (ki < 2000) return { name: 'Jonin', kanji: '上忍' };
    if (ki < 4000) return { name: 'Anbu', kanji: '暗部' };
    return { name: 'Kage', kanji: '影' };
  };

  const rank = getRank(totalKi);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header avec Rank et Ki */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Bonjour! 👋</Text>
            <Text style={styles.subtitle}>Prêt à apprendre le japonais?</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.rankBadge}>
              <Text style={styles.rankIcon}>📊</Text>
              <Text style={styles.rankLabel}>Rank</Text>
              <Text style={styles.rankValue}>{rank.name} ({rank.kanji})</Text>
            </View>
            <View style={styles.kiBadge}>
              <Text style={styles.kiLabel}>Ki 🪙</Text>
              <Text style={styles.kiValue}>+{totalKi}</Text>
            </View>
          </View>
        </View>

        {/* Calendrier hebdomadaire avec flamme */}
        <View style={styles.streakCalendar}>
          <View style={styles.flameContainer}>
            <Text style={styles.flameEmoji}>🔥</Text>
            <Text style={styles.flameCount}>{currentStreak}</Text>
          </View>
          <View style={styles.weekDays}>
            {weekDays.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <View style={[
                  styles.dayCircle,
                  index <= todayIndex && styles.dayCircleActive,
                  index === todayIndex && styles.dayCircleToday,
                ]}>
                  {index < todayIndex ? (
                    <Text style={styles.heartIcon}>❤️</Text>
                  ) : index === todayIndex ? (
                    <Text style={styles.heartIcon}>❤️</Text>
                  ) : (
                    <Text style={styles.heartIconEmpty}>🤍</Text>
                  )}
                </View>
                <Text style={[
                  styles.dayLabel,
                  index === todayIndex && styles.dayLabelActive,
                ]}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quêtes du Jour */}
        <View style={styles.questsSection}>
          <View style={styles.questsHeader}>
            <Text style={styles.questsEmoji}>🎯</Text>
            <Text style={styles.questsTitle}>Quêtes du Jour</Text>
            <View style={styles.questsCount}>
              <Text style={styles.questsCountText}>
                {dailyQuests.filter(q => q.completed).length}/{dailyQuests.length}
              </Text>
            </View>
          </View>

          {/* Quest Items */}
          <View style={styles.questItem}>
            <View style={styles.questIconContainer}>
              <Text style={styles.questIcon}>👑</Text>
            </View>
            <View style={styles.questContent}>
              <Text style={styles.questName}>Maîtrise parfaite</Text>
              <Text style={styles.questDescription}>Fais 5 exercices sans erreur</Text>
              <View style={styles.questProgressContainer}>
                <View style={styles.questProgressBar}>
                  <View style={[styles.questProgressFill, { width: '40%' }]} />
                </View>
                <Text style={styles.questProgressText}>2/5</Text>
              </View>
            </View>
            <View style={styles.questReward}>
              <Text style={styles.questRewardKi}>+100 Ki</Text>
              <Text style={styles.questRewardHeart}>+2 ❤️</Text>
            </View>
          </View>

          <View style={styles.questItem}>
            <View style={[styles.questIconContainer, { backgroundColor: '#3498db20' }]}>
              <Text style={styles.questIcon}>🎯</Text>
            </View>
            <View style={styles.questContent}>
              <Text style={styles.questName}>Régularité</Text>
              <Text style={styles.questDescription}>Garde ta Flamme vivante aujourd'hui</Text>
              <View style={styles.questProgressContainer}>
                <View style={styles.questProgressBar}>
                  <View style={[styles.questProgressFill, { width: '0%', backgroundColor: COLORS.textMuted }]} />
                </View>
                <Text style={styles.questProgressText}>0/1</Text>
              </View>
            </View>
            <View style={styles.questReward}>
              <Text style={styles.questRewardKi}>+25 Ki</Text>
            </View>
          </View>

          <View style={styles.questItem}>
            <View style={[styles.questIconContainer, { backgroundColor: '#9b59b620' }]}>
              <Text style={styles.questIcon}>📚</Text>
            </View>
            <View style={styles.questContent}>
              <Text style={styles.questName}>Réviser et mémoriser</Text>
              <Text style={styles.questDescription}>Complète 10 révisions SRS</Text>
              <View style={styles.questProgressContainer}>
                <View style={styles.questProgressBar}>
                  <View style={[styles.questProgressFill, { width: '30%' }]} />
                </View>
                <Text style={styles.questProgressText}>3/10</Text>
              </View>
            </View>
            <View style={styles.questReward}>
              <Text style={styles.questRewardKi}>+30 Ki</Text>
            </View>
          </View>
        </View>

        {/* Ta Progression */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Ta Progression</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalCards}</Text>
              <Text style={styles.statLabel}>Cartes SRS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{currentStreak}</Text>
              <Text style={styles.statLabel}>Jours 🔥</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalKi}</Text>
              <Text style={styles.statLabel}>Points Ki</Text>
            </View>
          </View>
        </View>

        {/* Actions Rapides */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ Actions Rapides</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Lessons')}
          >
            <Text style={styles.actionEmoji}>📚</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Commencer une leçon</Text>
              <Text style={styles.actionSubtitle}>22 leçons disponibles</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('SRS')}
          >
            <Text style={styles.actionEmoji}>🔄</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Révisions SRS</Text>
              <Text style={styles.actionSubtitle}>
                {reviewCount > 0
                  ? `${reviewCount} carte${reviewCount > 1 ? 's' : ''} à réviser`
                  : 'Aucune révision pour le moment'}
              </Text>
            </View>
            {reviewCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{reviewCount}</Text>
              </View>
            )}
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.actionEmoji}>👤</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Voir ton profil</Text>
              <Text style={styles.actionSubtitle}>Stats et badges</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Ad Banner */}
        <AdBanner style={styles.adBanner} />

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Lives Recovery Modal */}
      <LivesRecoveryModal
        visible={showRecoveryModal}
        onClose={() => setShowRecoveryModal(false)}
        onRecovered={handleLifeRecovered}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SIZES.margin,
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  scrollView: {
    flex: 1,
    padding: SIZES.screenPadding,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.margin,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  rankBadge: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: 8,
    alignItems: 'center',
  },
  rankIcon: {
    fontSize: 12,
  },
  rankLabel: {
    fontSize: FONTS.tiny,
    color: COLORS.primary,
    fontWeight: '600',
  },
  rankValue: {
    fontSize: FONTS.small,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  kiBadge: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: 8,
    alignItems: 'center',
  },
  kiLabel: {
    fontSize: FONTS.tiny,
    color: '#f1c40f',
    fontWeight: '600',
  },
  kiValue: {
    fontSize: FONTS.small,
    color: COLORS.text,
    fontWeight: 'bold',
  },

  // Streak Calendar
  streakCalendar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  flameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  flameEmoji: {
    fontSize: 24,
  },
  flameCount: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: '#ff6348',
    marginLeft: 4,
  },
  weekDays: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayCircleActive: {
    // Active days show heart
  },
  dayCircleToday: {
    // Today styling
  },
  heartIcon: {
    fontSize: 16,
  },
  heartIconEmpty: {
    fontSize: 16,
    opacity: 0.3,
  },
  dayLabel: {
    fontSize: FONTS.tiny,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  dayLabelActive: {
    color: COLORS.text,
  },

  // Search
  searchContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  searchLabel: {
    fontSize: FONTS.medium,
    color: COLORS.text,
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radiusSmall,
    padding: SIZES.padding,
    color: COLORS.text,
    fontSize: FONTS.medium,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  searchButtonIcon: {
    fontSize: FONTS.large,
    color: COLORS.text,
    fontWeight: 'bold',
  },

  // Challenge Card
  challengeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    borderLeftWidth: 4,
    borderLeftColor: '#f1c40f',
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  challengeEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  challengeTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  challengeBadge: {
    backgroundColor: '#2ecc7120',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSmall,
  },
  challengeBadgeText: {
    fontSize: FONTS.small,
    color: '#2ecc71',
    fontWeight: '600',
  },
  challengeProverb: {
    fontSize: FONTS.xLarge,
    color: COLORS.text,
    textAlign: 'center',
    marginVertical: SIZES.margin,
  },
  challengeRomaji: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: SIZES.margin,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kiReward: {
    backgroundColor: '#f1c40f20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSmall,
  },
  kiRewardText: {
    fontSize: FONTS.small,
    color: '#f1c40f',
    fontWeight: '600',
  },
  challengeLink: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
  },

  // Quests Section
  questsSection: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  questsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  questsEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  questsTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  questsCount: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSmall,
  },
  questsCountText: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Quest Item
  questItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  questIconContainer: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radius,
    backgroundColor: '#f1c40f20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  questIcon: {
    fontSize: 24,
  },
  questContent: {
    flex: 1,
  },
  questName: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  questDescription: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  questProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  questProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.background,
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  questProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  questProgressText: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
  },
  questReward: {
    alignItems: 'flex-end',
  },
  questRewardKi: {
    fontSize: FONTS.small,
    color: '#f1c40f',
    fontWeight: '600',
  },
  questRewardHeart: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Card
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.margin,
  },
  cardTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  // Action Buttons
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  actionEmoji: {
    fontSize: 32,
    marginRight: SIZES.margin,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
  },
  actionSubtitle: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actionArrow: {
    fontSize: 32,
    color: COLORS.textMuted,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginRight: SIZES.marginSmall,
  },
  badgeText: {
    color: 'white',
    fontSize: FONTS.small,
    fontWeight: 'bold',
  },

  adBanner: {
    marginVertical: SIZES.margin,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
});
