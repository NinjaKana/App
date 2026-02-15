/**
 * SRS Review Screen - Écran de révision des cartes SRS
 * Révise les cartes avec l'algorithme SM-2 et gagne des vies gratuites !
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SRSCard from '../components/SRSCard';
import {
  getDueCards,
  reviewCard,
  DIFFICULTY_FACTORS,
} from '../services/srsSystem';
import { incrementQuestProgress } from '../services/questsSystem';
import { incrementSRSRecoveryProgress } from '../services/livesSystem';
import { useTheme } from '../contexts/ThemeContext';
import { FONTS, SIZES } from '../styles/theme';
import { useTranslation } from 'react-i18next';

export default function SRSReviewScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(colors);

  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showLifeRecovered, setShowLifeRecovered] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    setLoading(true);
    const dueCards = await getDueCards();
    setCards(dueCards);
    setLoading(false);

    if (dueCards.length === 0) {
      // Aucune carte à réviser
      setShowResults(true);
    }
  };

  const handleAnswer = async (card, difficulty) => {
    // Mettre à jour la carte dans le système SRS
    await reviewCard(card.id, difficulty);

    // Incrémenter quête SRS
    await incrementQuestProgress('srs_review');

    // Incrémenter progression pour récupération de vie (max 5/jour)
    await incrementSRSRecoveryProgress();

    // Compter les réponses correctes
    const isCorrect = difficulty >= DIFFICULTY_FACTORS.GOOD;
    if (isCorrect) {
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);
    }

    // Passer à la carte suivante ou afficher les résultats
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const renderNoCards = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>{t('srs.noCards')}</Text>
      <Text style={styles.textSecondary}>
        {t('srs.allCardsUpToDate')}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleClose}>
        <Text style={styles.buttonText}>{t('back')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderResults = () => {
    const totalReviewed = currentIndex + 1;
    const accuracy =
      totalReviewed > 0 ? Math.round((correctCount / totalReviewed) * 100) : 0;

    return (
      <Modal visible={showResults} animationType="fade" transparent={false}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>{t('srs.reviewComplete')}</Text>

            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{`${totalReviewed}`}</Text>
                <Text style={styles.statLabel}>{t('srs.cardsReviewed')}</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.success }]}>
                  {`${correctCount}`}
                </Text>
                <Text style={styles.statLabel}>{t('srs.correctCards')}</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  {`${accuracy}%`}
                </Text>
                <Text style={styles.statLabel}>{t('srs.accuracy')}</Text>
              </View>
            </View>

            {totalReviewed >= 5 && (
              <View style={styles.bonusContainer}>
                <Text style={styles.bonusTitle}>{t('srs.bonusTitle')}</Text>
                <Text style={styles.bonusText}>
                  {t('srs.bonusText', { count: totalReviewed })}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.buttonText}>{t('done')}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderLifeRecoveredModal = () => (
    <Modal
      visible={showLifeRecovered}
      transparent
      animationType="fade"
      onRequestClose={() => setShowLifeRecovered(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalEmoji}>🎉</Text>
          <Text style={styles.modalTitle}>{t('srs.fiveCorrectReviews')}</Text>
          <Text style={styles.modalText}>
            {t('srs.fiveCorrectReviewsMessage')}
          </Text>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setShowLifeRecovered(false)}
          >
            <Text style={styles.modalButtonText}>{t('understood')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.text, { marginTop: SIZES.margin }]}>
            {t('srs.loadingCards')}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (cards.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>{renderNoCards()}</SafeAreaView>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {`${currentIndex + 1} / ${cards.length}`}
            </Text>
          </View>

          {/* Correct count */}
          <View style={styles.correctContainer}>
            <Text style={styles.correctText}>{`✓ ${correctCount}`}</Text>
          </View>
        </View>

        {/* SRS Card */}
        <SRSCard key={currentCard.id} card={currentCard} onAnswer={handleAnswer} isLastCard={currentIndex === cards.length - 1} />

        {/* Results Modal */}
        {renderResults()}

        {/* Life Recovered Modal */}
        {renderLifeRecoveredModal()}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  text: {
    fontSize: FONTS.regular,
    color: colors.text,
  },
  title: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: SIZES.margin,
  },
  textSecondary: {
    fontSize: FONTS.regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
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
  progressContainer: {
    flex: 1,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: colors.surface,
    borderRadius: SIZES.radiusSmall,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: FONTS.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  correctContainer: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
    borderRadius: SIZES.radiusSmall,
  },
  correctText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: colors.success,
  },
  emoji: {
    fontSize: 80,
    marginBottom: SIZES.margin * 2,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
    marginTop: SIZES.margin * 2,
  },
  buttonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.background,
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.screenPadding,
    backgroundColor: colors.background,
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
    marginBottom: SIZES.margin * 2,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: SIZES.marginSmall,
  },
  statLabel: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bonusContainer: {
    backgroundColor: colors.success + '10',
    borderWidth: 2,
    borderColor: colors.success,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    marginBottom: SIZES.margin * 2,
  },
  bonusTitle: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: colors.success,
    textAlign: 'center',
    marginBottom: SIZES.marginSmall,
  },
  bonusText: {
    fontSize: FONTS.medium,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.padding * 3,
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  modalEmoji: {
    fontSize: 80,
    marginBottom: SIZES.margin,
  },
  modalTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  modalText: {
    fontSize: FONTS.medium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SIZES.margin * 2,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: SIZES.padding * 3,
    paddingVertical: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
  },
  modalButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: colors.background,
  },
});
