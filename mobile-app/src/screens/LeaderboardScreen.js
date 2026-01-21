/**
 * Leaderboard Screen - Classement hebdomadaire
 *
 * Affiche:
 * - Ligue actuelle avec badge
 * - Classement des 20 participants
 * - Position de l'utilisateur mise en évidence
 * - Zones de promotion/rélégation
 * - Compte à rebours jusqu'au reset
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { FONTS, SIZES } from '../styles/theme';
import {
  getRanking,
  getLeaderboardStats,
  LEAGUES,
  POSITION_REWARDS,
} from '../services/leaderboardService';

export default function LeaderboardScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [ranking, setRanking] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      const [rankingData, statsData] = await Promise.all([
        getRanking(),
        getLeaderboardStats(),
      ]);
      setRanking(rankingData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* League Header */}
        {stats && (
          <View style={styles.leagueHeader}>
            <View
              style={[
                styles.leagueBadge,
                { backgroundColor: stats.league.color + '20' },
              ]}
            >
              <Text style={styles.leagueEmoji}>{stats.league.emoji}</Text>
            </View>
            <Text style={styles.leagueName}>Ligue {stats.league.name}</Text>
            <Text style={styles.leaguePosition}>
              Position #{stats.position} sur {stats.totalParticipants}
            </Text>

            {/* Timer */}
            <View style={styles.timerBox}>
              <Text style={styles.timerLabel}>Fin dans</Text>
              <Text style={styles.timerValue}>
                {stats.timeUntilReset.days}j {stats.timeUntilReset.hours}h
              </Text>
            </View>

            {/* Status badges */}
            {stats.isInPromotionZone && (
              <View style={[styles.statusBadge, styles.promotionBadge]}>
                <Text style={styles.statusText}>Zone de promotion</Text>
              </View>
            )}
            {stats.isInRelegationZone && (
              <View style={[styles.statusBadge, styles.relegationBadge]}>
                <Text style={styles.statusText}>Zone de rélégation</Text>
              </View>
            )}
          </View>
        )}

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
            <Text style={styles.legendText}>Promotion (Top 3)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
            <Text style={styles.legendText}>Rélégation (18-20)</Text>
          </View>
        </View>

        {/* Ranking List */}
        <View style={styles.rankingContainer}>
          {ranking.map((player, index) => (
            <View
              key={player.id}
              style={[
                styles.playerRow,
                player.isUser && styles.playerRowUser,
                player.inPromotionZone && styles.playerRowPromotion,
                player.inRelegationZone && styles.playerRowRelegation,
              ]}
            >
              {/* Position */}
              <View style={styles.positionContainer}>
                {player.position <= 3 ? (
                  <Text style={styles.positionMedal}>
                    {player.position === 1 && '🥇'}
                    {player.position === 2 && '🥈'}
                    {player.position === 3 && '🥉'}
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.positionNumber,
                      player.isUser && styles.positionNumberUser,
                    ]}
                  >
                    {player.position}
                  </Text>
                )}
              </View>

              {/* Avatar & Name */}
              <View style={styles.playerInfo}>
                <Text style={styles.playerAvatar}>{player.avatar || '👤'}</Text>
                <Text
                  style={[
                    styles.playerName,
                    player.isUser && styles.playerNameUser,
                  ]}
                >
                  {player.name}
                  {player.isUser && ' (toi)'}
                </Text>
              </View>

              {/* XP */}
              <View style={styles.xpContainer}>
                <Text
                  style={[styles.xpValue, player.isUser && styles.xpValueUser]}
                >
                  {player.xp}
                </Text>
                <Text style={styles.xpLabel}>XP</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Rewards Info */}
        <View style={styles.rewardsSection}>
          <Text style={styles.rewardsTitle}>Récompenses de fin de semaine</Text>

          <View style={styles.rewardRow}>
            <Text style={styles.rewardMedal}>🥇</Text>
            <Text style={styles.rewardText}>
              +{POSITION_REWARDS[1].xp} XP, +{POSITION_REWARDS[1].lives} vies
            </Text>
          </View>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardMedal}>🥈</Text>
            <Text style={styles.rewardText}>
              +{POSITION_REWARDS[2].xp} XP, +{POSITION_REWARDS[2].lives} vies
            </Text>
          </View>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardMedal}>🥉</Text>
            <Text style={styles.rewardText}>
              +{POSITION_REWARDS[3].xp} XP, +{POSITION_REWARDS[3].lives} vie
            </Text>
          </View>
          <View style={styles.rewardRow}>
            <Text style={styles.rewardMedal}>⬆️</Text>
            <Text style={styles.rewardText}>
              Top 3 = Promotion vers la ligue supérieure
            </Text>
          </View>
        </View>

        {/* All Leagues */}
        <View style={styles.allLeagues}>
          <Text style={styles.allLeaguesTitle}>Toutes les ligues</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {LEAGUES.map((league) => (
              <View
                key={league.id}
                style={[
                  styles.leagueItem,
                  stats?.league.id === league.id && styles.leagueItemCurrent,
                ]}
              >
                <Text style={styles.leagueItemEmoji}>{league.emoji}</Text>
                <Text
                  style={[
                    styles.leagueItemName,
                    stats?.league.id === league.id && styles.leagueItemNameCurrent,
                  ]}
                >
                  {league.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: FONTS.regular,
    color: colors.text,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // League Header
  leagueHeader: {
    alignItems: 'center',
    padding: SIZES.paddingLarge,
    backgroundColor: colors.surface,
    marginBottom: SIZES.margin,
  },
  leagueBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  leagueEmoji: {
    fontSize: 40,
  },
  leagueName: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.text,
  },
  leaguePosition: {
    fontSize: FONTS.regular,
    color: colors.textSecondary,
    marginTop: 4,
  },
  timerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.margin,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
  },
  timerLabel: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
    marginRight: 8,
  },
  timerValue: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statusBadge: {
    marginTop: SIZES.margin,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
  },
  promotionBadge: {
    backgroundColor: colors.successLight,
  },
  relegationBadge: {
    backgroundColor: colors.errorLight,
  },
  statusText: {
    fontSize: FONTS.small,
    fontWeight: '600',
  },

  // Legend
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SIZES.padding,
    backgroundColor: colors.surface,
    marginBottom: SIZES.margin,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.margin,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
  },

  // Ranking
  rankingContainer: {
    backgroundColor: colors.surface,
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginBottom: SIZES.margin,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  playerRowUser: {
    backgroundColor: colors.primaryLight,
  },
  playerRowPromotion: {
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
  },
  playerRowRelegation: {
    borderLeftWidth: 3,
    borderLeftColor: colors.error,
  },
  positionContainer: {
    width: 36,
    alignItems: 'center',
  },
  positionMedal: {
    fontSize: 24,
  },
  positionNumber: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  positionNumberUser: {
    color: colors.primary,
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SIZES.margin,
  },
  playerAvatar: {
    fontSize: 20,
    marginRight: 8,
  },
  playerName: {
    fontSize: FONTS.regular,
    color: colors.text,
  },
  playerNameUser: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  xpContainer: {
    alignItems: 'flex-end',
  },
  xpValue: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  xpValueUser: {
    color: colors.primary,
  },
  xpLabel: {
    fontSize: FONTS.tiny,
    color: colors.textSecondary,
  },

  // Rewards
  rewardsSection: {
    backgroundColor: colors.surface,
    marginHorizontal: SIZES.screenPadding,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  rewardsTitle: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.margin,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  rewardMedal: {
    fontSize: 20,
    width: 32,
  },
  rewardText: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
  },

  // All Leagues
  allLeagues: {
    padding: SIZES.screenPadding,
    marginBottom: SIZES.paddingLarge,
  },
  allLeaguesTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: colors.text,
    marginBottom: SIZES.margin,
  },
  leagueItem: {
    alignItems: 'center',
    marginRight: SIZES.padding,
    padding: SIZES.paddingSmall,
    borderRadius: SIZES.radius,
    backgroundColor: colors.surface,
    minWidth: 70,
  },
  leagueItemCurrent: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  leagueItemEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  leagueItemName: {
    fontSize: FONTS.tiny,
    color: colors.textSecondary,
  },
  leagueItemNameCurrent: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
