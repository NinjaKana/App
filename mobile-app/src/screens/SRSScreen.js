/**
 * SRS Screen - Écran de révisions SRS (Spaced Repetition System)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSRSStats, getDueCards } from '../services/srsSystem';
import { useTheme } from '../contexts/ThemeContext';
import { FONTS, SIZES } from '../styles/theme';
import AdBanner from '../components/AdBanner';

export default function SRSScreen({ navigation }) {
  const { colors } = useTheme();
  const [stats, setStats] = useState(null);
  const [dueCards, setDueCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = createStyles(colors);

  useEffect(() => {
    loadStats();

    // Recharger les stats quand on revient sur l'écran
    const unsubscribe = navigation.addListener('focus', () => {
      loadStats();
    });

    return unsubscribe;
  }, [navigation]);

  const loadStats = async () => {
    setLoading(true);
    const srsStats = await getSRSStats();
    const cards = await getDueCards();
    setStats(srsStats);
    setDueCards(cards);
    setLoading(false);
  };

  const handleStartReview = () => {
    navigation.navigate('SRSReview');
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const hasDueCards = dueCards.length > 0;
  const hasCards = stats && stats.total > 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🧠 Révisions SRS</Text>
          <Text style={styles.subtitle}>
            Système de répétition espacée (Algorithme SM-2)
          </Text>
        </View>

        {/* Due Cards Card */}
        {hasCards && (
          <View style={styles.dueCard}>
            <Text style={styles.dueCount}>{`${dueCards.length}`}</Text>
            <Text style={styles.dueLabel}>
              {dueCards.length === 0
                ? 'Aucune carte à réviser'
                : dueCards.length === 1
                ? 'Carte à réviser'
                : 'Cartes à réviser'}
            </Text>

            {hasDueCards && (
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartReview}
              >
                <Text style={styles.startButtonText}>
                  Commencer les révisions
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Stats Grid */}
        {hasCards && stats && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📊 Statistiques</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{`${stats.total}`}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  {`${stats.newCards}`}
                </Text>
                <Text style={styles.statLabel}>Nouvelles</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.warning }]}>
                  {`${stats.learning}`}
                </Text>
                <Text style={styles.statLabel}>En cours</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.success }]}>
                  {`${stats.mature}`}
                </Text>
                <Text style={styles.statLabel}>Matures</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{`${stats.totalReviews}`}</Text>
                <Text style={styles.statLabel}>Révisions</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>{`${stats.avgEasiness}`}</Text>
                <Text style={styles.statLabel}>Facilité moy.</Text>
              </View>
            </View>
          </View>
        )}

        {/* Empty State */}
        {!hasCards && (
          <View style={styles.card}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📚</Text>
              <Text style={styles.emptyTitle}>Aucune carte SRS</Text>
              <Text style={styles.emptyText}>
                Les cartes SRS seront automatiquement créées depuis tes erreurs
                dans les exercices.
                {'\n\n'}
                Commence une leçon pour ajouter des cartes !
              </Text>

              <TouchableOpacity
                style={styles.goToLessonsButton}
                onPress={() => navigation.navigate('Lessons')}
              >
                <Text style={styles.goToLessonsText}>Voir les leçons</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Comment ça marche ?</Text>
          <Text style={styles.infoText}>
            1. Fais des exercices et apprends de nouvelles choses{'\n'}
            2. Les erreurs deviennent automatiquement des cartes SRS{'\n'}
            3. Révise au moment optimal pour mémoriser à long terme{'\n'}
            4. Bonus : 5 révisions correctes = +1 vie gratuite ! 💝
          </Text>
        </View>

        {/* Ad Banner */}
        <AdBanner style={styles.adBanner} />

        {/* Bottom padding */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Dynamic styles based on theme
const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: SIZES.screenPadding,
  },
  header: {
    marginBottom: SIZES.marginLarge,
  },
  title: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.marginSmall,
  },
  subtitle: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  dueCard: {
    backgroundColor: colors.surface,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    padding: SIZES.padding * 2,
    marginBottom: SIZES.margin,
  },
  dueCount: {
    fontSize: 72,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: SIZES.marginSmall,
  },
  dueLabel: {
    fontSize: FONTS.large,
    color: colors.textSecondary,
    marginBottom: SIZES.margin * 2,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: SIZES.padding * 3,
    paddingVertical: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
  },
  startButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.textOnPrimary,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.margin,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SIZES.margin,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: SIZES.margin,
  },
  emptyState: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: SIZES.margin,
  },
  emptyTitle: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.marginSmall,
  },
  emptyText: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SIZES.margin * 2,
  },
  goToLessonsButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  goToLessonsText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.textOnPrimary,
  },
  infoCard: {
    backgroundColor: colors.primary + '10',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin * 2,
  },
  infoTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.marginSmall,
  },
  infoText: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  adBanner: {
    marginBottom: SIZES.margin * 2,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
});
