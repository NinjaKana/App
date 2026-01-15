/**
 * Profile Screen - Nouveau Design Figma
 * Profil utilisateur avec stats, achievements et techniques
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getProgress } from '../services/storage';
import {
  getAllBadgesWithStatus,
  getBadgeProfileStats,
  RARITY_COLORS,
} from '../services/badgesSystem';
import { getCurrentStreak, getHighestStreak } from '../services/streakSystem';
import { BadgeGrid } from '../components/BadgeCard';
import { getLives } from '../services/livesSystem';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import globalStyles from '../styles/globalStyles';
import { usePremium } from '../contexts/PremiumContext';

export default function ProfileScreen({ navigation }) {
  const { isPremium, openPaywall } = usePremium();
  const [progress, setProgress] = useState(null);
  const [badges, setBadges] = useState([]);
  const [badgeStats, setBadgeStats] = useState(null);
  const [streakData, setStreakData] = useState({ current: 0, highest: 0 });
  const [lives, setLives] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  useFocusEffect(
    useCallback(() => {
      loadAllData();
    }, [])
  );

  const loadAllData = async () => {
    try {
      const [userProgress, allBadges, stats, currentStreak, highestStreak, currentLives] =
        await Promise.all([
          getProgress(),
          getAllBadgesWithStatus(),
          getBadgeProfileStats(),
          getCurrentStreak(),
          getHighestStreak(),
          getLives(),
        ]);

      setProgress(userProgress);
      setBadges(allBadges);
      setBadgeStats(stats);
      setStreakData({ current: currentStreak, highest: highestStreak });
      setLives(currentLives);
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadAllData();
  };

  // Calculer le rang basé sur Ki (XP) - Rangs Naruto
  const calculateRank = (xp) => {
    if (xp < 500) return { level: 1, title: 'Genin', subtitle: '下忍', nextXP: 500 };
    if (xp < 1000) return { level: 2, title: 'Chūnin', subtitle: '中忍', nextXP: 1000 };
    if (xp < 2000) return { level: 3, title: 'Tokubetsu Jōnin', subtitle: '特別上忍', nextXP: 2000 };
    if (xp < 4000) return { level: 4, title: 'Jōnin', subtitle: '上忍', nextXP: 4000 };
    if (xp < 8000) return { level: 5, title: 'Anbu', subtitle: '暗部', nextXP: 8000 };
    if (xp < 15000) return { level: 6, title: 'Sannin', subtitle: '伝説の三忍', nextXP: 15000 };
    if (xp < 30000) return { level: 7, title: 'Kage', subtitle: '影', nextXP: 30000 };
    return { level: 8, title: 'Hokage', subtitle: '火影', nextXP: null };
  };

  const rankInfo = calculateRank(progress?.totalPoints || 0);

  // Techniques (catégories apprises)
  const techniques = [
    {
      id: 'hiragana',
      name: 'Hiragana',
      icon: 'あ',
      progress: progress?.stats?.hiraganaLearned || 0,
      total: 46,
    },
    {
      id: 'katakana',
      name: 'Katakana',
      icon: 'ア',
      progress: progress?.stats?.katakanaLearned || 0,
      total: 46,
    },
    {
      id: 'kanji',
      name: 'Kanji',
      icon: '漢',
      progress: progress?.stats?.kanjiLearned || 0,
      total: 100,
    },
    {
      id: 'vocabulary',
      name: 'Vocabulaire',
      icon: '言',
      progress: progress?.stats?.wordsLearned || 0,
      total: 500,
    },
  ];

  // Badges débloqués uniquement
  const unlockedBadges = badges.filter((b) => b.unlocked);

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header - Design Figma */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
          <View style={styles.headerButtons}>
            {!isPremium && (
              <TouchableOpacity
                style={styles.premiumButton}
                onPress={openPaywall}
              >
                <Text style={styles.premiumIcon}>👑</Text>
                <Text style={styles.premiumText}>Premium</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Avatar et Rang - Design Figma */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>{getRankEmoji(rankInfo.level)}</Text>
            </View>
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{rankInfo.title}</Text>
            </View>
          </View>
          <Text style={styles.profileName}>Apprenant Japonais</Text>
          <Text style={styles.profileSubtitle}>{rankInfo.subtitle}</Text>
        </View>

        {/* Stats Cards - Design Figma (3 colonnes) */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>👑</Text>
            <Text style={styles.statValue}>{rankInfo.level}</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🪙</Text>
            <Text style={styles.statValue}>{progress?.totalPoints || 0}</Text>
            <Text style={styles.statLabel}>Ki</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{streakData.current}</Text>
            <Text style={styles.statLabel}>Flamme</Text>
          </View>
        </View>

        {/* Progress vers le prochain rang */}
        {rankInfo.nextXP && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Prochain rang</Text>
              <Text style={styles.progressValue}>
                {progress?.totalPoints || 0} / {rankInfo.nextXP} Ki
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(
                      100,
                      ((progress?.totalPoints || 0) / rankInfo.nextXP) * 100
                    )}%`,
                  },
                ]}
              />
            </View>
          </View>
        )}

        {/* Achievements - Design Figma */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Achievements</Text>
            <Text style={styles.seeAllText}>
              {unlockedBadges.length} / 12
            </Text>
          </View>

          {unlockedBadges.length > 0 ? (
            <View style={styles.achievementsGrid}>
              {unlockedBadges.slice(0, 4).map((badge) => (
                <TouchableOpacity
                  key={badge.id}
                  style={styles.achievementItem}
                  onPress={() => setSelectedBadge(badge)}
                >
                  <View
                    style={[
                      styles.achievementIcon,
                      { borderColor: RARITY_COLORS[badge.rarity] || COLORS.primary },
                    ]}
                  >
                    <Text style={styles.achievementEmoji}>{badge.icon}</Text>
                  </View>
                  <Text style={styles.achievementName} numberOfLines={1}>
                    {badge.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyAchievements}>
              <Text style={styles.emptyIcon}>🎯</Text>
              <Text style={styles.emptyText}>Aucun badge débloqué</Text>
              <Text style={styles.emptySubtext}>Continue à apprendre !</Text>
            </View>
          )}
        </View>

        {/* Techniques - Design Figma */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Techniques</Text>

          {techniques.map((tech) => (
            <View key={tech.id} style={styles.techniqueCard}>
              <View style={styles.techniqueIcon}>
                <Text style={styles.techniqueChar}>{tech.icon}</Text>
              </View>
              <View style={styles.techniqueInfo}>
                <Text style={styles.techniqueName}>{tech.name}</Text>
                <View style={styles.techniqueProgressBar}>
                  <View
                    style={[
                      styles.techniqueProgressFill,
                      { width: `${Math.min(100, (tech.progress / tech.total) * 100)}%` },
                    ]}
                  />
                </View>
              </View>
              <Text style={styles.techniqueCount}>
                {tech.progress}/{tech.total}
              </Text>
            </View>
          ))}
        </View>

        {/* Stats détaillées */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Statistiques détaillées</Text>

          <View style={styles.detailStatsGrid}>
            <View style={styles.detailStat}>
              <Text style={styles.detailIcon}>📖</Text>
              <Text style={styles.detailValue}>
                {progress?.stats?.lessonsCompleted || 0}
              </Text>
              <Text style={styles.detailLabel}>Leçons</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailIcon}>✅</Text>
              <Text style={styles.detailValue}>
                {progress?.stats?.exercisesCompleted || 0}
              </Text>
              <Text style={styles.detailLabel}>Exercices</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailIcon}>🏆</Text>
              <Text style={styles.detailValue}>{streakData.highest}</Text>
              <Text style={styles.detailLabel}>Record</Text>
            </View>
            <View style={styles.detailStat}>
              <Text style={styles.detailIcon}>❤️</Text>
              <Text style={styles.detailValue}>{lives}/7</Text>
              <Text style={styles.detailLabel}>Vies</Text>
            </View>
          </View>
        </View>

        {/* Badge Modal */}
        <Modal
          visible={!!selectedBadge}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedBadge(null)}
        >
          {selectedBadge && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View
                  style={[
                    styles.modalIcon,
                    { borderColor: RARITY_COLORS[selectedBadge.rarity] || COLORS.primary },
                  ]}
                >
                  <Text style={styles.modalEmoji}>{selectedBadge.icon}</Text>
                </View>
                <Text style={styles.modalName}>{selectedBadge.name}</Text>
                <Text style={styles.modalDescription}>{selectedBadge.description}</Text>

                {selectedBadge.reward && (
                  <View style={styles.modalReward}>
                    <Text style={styles.modalRewardText}>
                      Récompense : +{selectedBadge.reward.xp || 0} Ki 🪙
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setSelectedBadge(null)}
                >
                  <Text style={styles.modalCloseText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper - Emoji selon le rang
const getRankEmoji = (level) => {
  const emojis = ['🥷', '📜', '⚔️', '🎖️', '🎭', '🐉', '🔥', '👑'];
  return emojis[Math.min(level - 1, emojis.length - 1)];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingText: {
    color: COLORS.text,
    fontSize: FONTS.medium,
  },

  // Header - Design Figma
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.screenPadding,
    paddingBottom: 0,
  },
  headerTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    fontSize: 22,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
    borderRadius: SIZES.radius,
    gap: 6,
  },
  premiumIcon: {
    fontSize: 16,
  },
  premiumText: {
    fontSize: FONTS.small,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // Profile Section
  profileSection: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 1.5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SIZES.margin,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarEmoji: {
    fontSize: 48,
  },
  rankBadge: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankText: {
    fontSize: FONTS.small,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileName: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.marginSmall,
  },
  profileSubtitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Stats Cards - Design Figma
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.screenPadding,
    gap: SIZES.marginSmall,
    marginBottom: SIZES.margin,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Progress Section
  progressSection: {
    marginHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.margin,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  progressValue: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },

  // Section
  section: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SIZES.screenPadding,
    marginBottom: SIZES.margin,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.marginSmall,
  },
  seeAllText: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
  },

  // Achievements Grid
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.marginSmall,
  },
  achievementItem: {
    width: '22%',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginBottom: 6,
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementName: {
    fontSize: FONTS.tiny,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  emptyAchievements: {
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: SIZES.marginSmall,
  },
  emptyText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
  },
  emptySubtext: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
    marginTop: 4,
  },

  // Techniques
  techniqueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  techniqueIcon: {
    width: 44,
    height: 44,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  techniqueChar: {
    fontSize: 22,
    color: COLORS.text,
  },
  techniqueInfo: {
    flex: 1,
  },
  techniqueName: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  techniqueProgressBar: {
    height: 6,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 3,
    overflow: 'hidden',
  },
  techniqueProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  techniqueCount: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginLeft: SIZES.marginSmall,
  },

  // Detail Stats
  detailStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailStat: {
    width: '25%',
    alignItems: 'center',
    paddingVertical: SIZES.paddingSmall,
  },
  detailIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  detailLabel: {
    fontSize: FONTS.tiny,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginBottom: SIZES.margin,
  },
  modalEmoji: {
    fontSize: 40,
  },
  modalName: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  modalReward: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
  },
  modalRewardText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.primary,
  },
  modalCloseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
  },
  modalCloseText: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
