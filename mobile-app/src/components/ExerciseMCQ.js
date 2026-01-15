/**
 * Exercise MCQ Component - Nouveau Design Figma
 * Questions à choix multiples avec card violette
 * Audio intégré : prononciation au clic + bonne réponse après validation
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import audioService from '../services/audioService';

export default function ExerciseMCQ({ exercise, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [scaleAnims] = useState(
    exercise.options.map(() => new Animated.Value(1))
  );

  // Labels pour les options (A, B, C, D)
  const optionLabels = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    // Réinitialiser l'état quand l'exercice change
    setSelectedOption(null);
    setAnswered(false);
    // Réinitialiser les animations
    scaleAnims.forEach(anim => anim.setValue(1));
  }, [exercise]);

  const handleOptionPress = async (option, index) => {
    if (answered) return;

    // Jouer l'audio de l'option cliquée (aide à l'apprentissage)
    await audioService.play(option);

    setSelectedOption(option);
    setAnswered(true);

    // Animation de pression
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Jouer l'audio de la bonne réponse après un court délai (renforcement)
    setTimeout(async () => {
      // Si mauvaise réponse, jouer la bonne pour renforcer l'apprentissage
      if (option !== exercise.correct) {
        await audioService.play(exercise.correct);
      }
    }, 400);

    // Délai pour montrer la sélection avant de valider
    setTimeout(() => {
      onAnswer(option);
    }, 800);
  };

  const getOptionStyle = (option, index) => {
    if (!answered) {
      return styles.option;
    }

    const isCorrect = option === exercise.correct;
    const isSelected = option === selectedOption;

    if (isSelected && isCorrect) {
      return [styles.option, styles.optionCorrect];
    } else if (isSelected && !isCorrect) {
      return [styles.option, styles.optionIncorrect];
    } else if (isCorrect) {
      return [styles.option, styles.optionCorrect];
    }

    return [styles.option, styles.optionFaded];
  };

  const getOptionTextStyle = (option) => {
    if (!answered) return styles.optionText;

    const isCorrect = option === exercise.correct;
    const isSelected = option === selectedOption;

    if (isSelected || isCorrect) {
      return [styles.optionText, styles.optionTextActive];
    }

    return [styles.optionText, styles.optionTextFaded];
  };

  return (
    <View style={styles.container}>
      {/* Card violette avec la question - Design Figma */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{exercise.question}</Text>
        {exercise.character && (
          <Text style={styles.character}>{exercise.character}</Text>
        )}
      </View>

      {/* Options avec labels A, B, C, D */}
      <View style={styles.optionsContainer}>
        {exercise.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{ transform: [{ scale: scaleAnims[index] }] }}
          >
            <TouchableOpacity
              style={getOptionStyle(option, index)}
              onPress={() => handleOptionPress(option, index)}
              disabled={answered}
              activeOpacity={0.7}
            >
              <View style={styles.optionLabel}>
                <Text style={styles.optionLabelText}>
                  {optionLabels[index]}
                </Text>
              </View>
              <Text style={getOptionTextStyle(option)}>{option}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Explication (si disponible et répondu) */}
      {answered && exercise.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>💡 {exercise.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.screenPadding,
  },

  // Card violette pour la question (Design Figma)
  questionCard: {
    backgroundColor: '#8b5cf6', // Violet du design
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.padding * 2,
    marginBottom: SIZES.margin * 2,
    alignItems: 'center',
    // Effet de motif asanoha simulé avec overlay
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: FONTS.large,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  character: {
    fontSize: 72,
    color: COLORS.text,
    fontWeight: '300',
  },

  // Options avec style Figma
  optionsContainer: {
    gap: SIZES.marginSmall,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCorrect: {
    backgroundColor: COLORS.success + '20',
    borderColor: COLORS.success,
  },
  optionIncorrect: {
    backgroundColor: COLORS.error + '20',
    borderColor: COLORS.error,
  },
  optionFaded: {
    opacity: 0.5,
  },
  optionLabel: {
    width: 36,
    height: 36,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  optionLabelText: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },
  optionText: {
    flex: 1,
    fontSize: FONTS.large,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  optionTextActive: {
    color: COLORS.text,
  },
  optionTextFaded: {
    color: COLORS.textMuted,
  },

  // Explication
  explanationContainer: {
    marginTop: SIZES.margin * 2,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  explanationText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
