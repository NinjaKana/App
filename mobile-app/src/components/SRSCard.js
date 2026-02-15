/**
 * SRS Card Component - Carte de révision SRS
 * Affiche le caractère et permet de choisir la difficulté
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import audioService from '../services/audioService';
import { useTranslation } from 'react-i18next';

export default function SRSCard({ card, onAnswer, isLastCard = false }) {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleFlip = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  };

  const handlePlayAudio = async () => {
    if (card.romaji) {
      setIsPlayingAudio(true);
      await audioService.play(card.romaji);
      setTimeout(() => setIsPlayingAudio(false), 800);
    }
  };

  const handleDifficultySelect = (difficulty) => {
    onAnswer(card, difficulty);
    if (!isLastCard) {
      setIsFlipped(false);
      flipAnim.setValue(0);
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Front - Question */}
      <Animated.View
        style={[
          styles.cardSide,
          styles.cardFront,
          { transform: [{ rotateY: frontInterpolate }] },
          isFlipped && { opacity: 0 },
        ]}
        pointerEvents={isFlipped ? 'none' : 'auto'}
      >
        <View style={styles.cardHeader}>
          <TouchableOpacity
            style={styles.audioButton}
            onPress={handlePlayAudio}
          >
            <Text style={styles.audioIcon}>{isPlayingAudio ? '▶️' : '🔊'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.character}>{card.character}</Text>
        <Text style={styles.hint}>{t('srs.whatIsThis')}</Text>

        <TouchableOpacity style={styles.flipButton} onPress={handleFlip}>
          <Text style={styles.flipButtonText}>{t('srs.showAnswer')}</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Back - Réponse */}
      <Animated.View
        style={[
          styles.cardSide,
          styles.cardBack,
          { transform: [{ rotateY: backInterpolate }] },
          !isFlipped && { opacity: 0 },
        ]}
        pointerEvents={!isFlipped ? 'none' : 'auto'}
      >
        <View style={styles.cardHeader}>
          <TouchableOpacity
            style={styles.audioButton}
            onPress={handlePlayAudio}
          >
            <Text style={styles.audioIcon}>{isPlayingAudio ? '▶️' : '🔊'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.character}>{card.character}</Text>
        <Text style={styles.romaji}>{card.romaji}</Text>
        {card.meaning && <Text style={styles.meaning}>{card.meaning}</Text>}

        <Text style={styles.difficultyLabel}>{t('srs.howWasIt')}</Text>

        <View style={styles.difficultyButtons}>
          <TouchableOpacity
            style={[styles.difficultyButton, styles.againButton]}
            onPress={() => handleDifficultySelect(0)}
          >
            <Text style={styles.difficultyText}>❌</Text>
            <Text style={styles.difficultyName}>{t('srs.forgotten')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.difficultyButton, styles.hardButton]}
            onPress={() => handleDifficultySelect(1)}
          >
            <Text style={styles.difficultyText}>😐</Text>
            <Text style={styles.difficultyName}>{t('srs.hard')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.difficultyButton, styles.goodButton]}
            onPress={() => handleDifficultySelect(2)}
          >
            <Text style={styles.difficultyText}>👍</Text>
            <Text style={styles.difficultyName}>{t('srs.good')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.difficultyButton, styles.easyButton]}
            onPress={() => handleDifficultySelect(3)}
          >
            <Text style={styles.difficultyText}>😊</Text>
            <Text style={styles.difficultyName}>{t('srs.easy')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.difficultyButton, styles.perfectButton]}
            onPress={() => handleDifficultySelect(4)}
          >
            <Text style={styles.difficultyText}>🌟</Text>
            <Text style={styles.difficultyName}>{t('srs.perfect')}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  cardSide: {
    position: 'absolute',
    width: '100%',
    maxWidth: 400,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.padding * 2,
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    justifyContent: 'center',
    minHeight: 400,
  },
  cardBack: {
    justifyContent: 'flex-start',
    paddingTop: SIZES.padding * 3,
  },
  character: {
    fontSize: 120,
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  romaji: {
    fontSize: FONTS.xxxLarge,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: SIZES.marginSmall,
  },
  meaning: {
    fontSize: FONTS.large,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin * 2,
  },
  hint: {
    fontSize: FONTS.large,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin * 3,
  },
  flipButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
  },
  flipButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  difficultyLabel: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin,
  },
  difficultyButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.marginSmall,
    justifyContent: 'center',
    marginTop: SIZES.margin,
  },
  difficultyButton: {
    alignItems: 'center',
    padding: SIZES.padding,
    borderRadius: SIZES.radiusSmall,
    minWidth: 70,
  },
  againButton: {
    backgroundColor: COLORS.error + '20',
  },
  hardButton: {
    backgroundColor: COLORS.warning + '20',
  },
  goodButton: {
    backgroundColor: COLORS.primary + '20',
  },
  easyButton: {
    backgroundColor: COLORS.success + '20',
  },
  perfectButton: {
    backgroundColor: COLORS.success + '30',
  },
  difficultyText: {
    fontSize: 32,
    marginBottom: 4,
  },
  difficultyName: {
    fontSize: FONTS.small,
    color: COLORS.text,
    fontWeight: '600',
  },
  cardHeader: {
    position: 'absolute',
    top: SIZES.padding,
    right: SIZES.padding,
    zIndex: 10,
  },
  audioButton: {
    padding: 8,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 20,
  },
  audioIcon: {
    fontSize: 20,
  },
});
