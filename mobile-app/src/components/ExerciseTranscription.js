/**
 * Exercise Transcription Component - Saisie de texte (romaji)
 * L'utilisateur doit taper la transcription romaji d'un caractère
 * Audio intégré : prononciation de la bonne réponse après validation
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import audioService from '../services/audioService';

export default function ExerciseTranscription({ exercise, onAnswer }) {
  const [userInput, setUserInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Auto-focus sur l'input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  }, []);

  useEffect(() => {
    // Réinitialiser l'état quand l'exercice change
    setUserInput('');
    setAnswered(false);
    setIsCorrect(false);
    shakeAnim.setValue(0);
  }, [exercise]);

  const handleSubmit = async () => {
    if (!userInput.trim() || answered) return;

    const correct = userInput.trim().toLowerCase() === exercise.correct.toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);

    // Jouer l'audio de la bonne réponse (renforcement apprentissage)
    await audioService.play(exercise.correct);

    if (!correct) {
      // Animation de shake si incorrect
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }

    Keyboard.dismiss();

    // Délai avant de passer à la question suivante
    setTimeout(() => {
      onAnswer(userInput.trim());
    }, correct ? 800 : 1500);
  };

  const getInputStyle = () => {
    if (!answered) {
      return styles.input;
    }
    return [
      styles.input,
      isCorrect ? styles.inputCorrect : styles.inputIncorrect,
    ];
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{exercise.question}</Text>
          {exercise.character && (
            <Text style={styles.character}>{exercise.character}</Text>
          )}
          {exercise.meaning && (
            <Text style={styles.meaning}>({exercise.meaning})</Text>
          )}
        </View>

        {/* Input */}
        <Animated.View
          style={[
            styles.inputContainer,
            { transform: [{ translateX: shakeAnim }] },
          ]}
        >
          <TextInput
            ref={inputRef}
            style={getInputStyle()}
            value={userInput}
            onChangeText={setUserInput}
            onSubmitEditing={handleSubmit}
            placeholder="Tapez le romaji..."
            placeholderTextColor={COLORS.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!answered}
            returnKeyType="done"
          />
        </Animated.View>

        {/* Bouton Valider principal */}
        {!answered && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              !userInput.trim() && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!userInput.trim()}
          >
            <Text style={styles.submitButtonText}>Valider</Text>
          </TouchableOpacity>
        )}

        {/* Feedback */}
        {answered && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackEmoji}>
              {isCorrect ? '✅' : '❌'}
            </Text>
            <Text style={styles.feedbackText}>
              {isCorrect ? 'Correct !' : `Réponse : ${exercise.correct}`}
            </Text>
          </View>
        )}

        {/* Explication */}
        {answered && exercise.explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>💡 {exercise.explanation}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.screenPadding,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
    paddingTop: SIZES.padding,
  },
  questionText: {
    fontSize: FONTS.xLarge,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin,
    lineHeight: 30,
    minHeight: 30,
  },
  character: {
    fontSize: 72,
    color: COLORS.primary,
    marginTop: SIZES.margin,
  },
  meaning: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: SIZES.marginSmall,
  },
  inputContainer: {
    marginBottom: SIZES.margin,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
  },
  inputField: {
    flex: 1,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    borderColor: COLORS.surfaceLight,
    padding: SIZES.padding * 1.5,
    fontSize: FONTS.xLarge,
    color: COLORS.text,
    textAlign: 'center',
  },
  inlineSubmitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineSubmitButtonDisabled: {
    backgroundColor: COLORS.surfaceLight,
    opacity: 0.5,
  },
  inlineSubmitButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  inputCorrect: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '10',
  },
  inputIncorrect: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.error + '10',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.surfaceLight,
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: SIZES.marginSmall,
  },
  feedbackEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  feedbackText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  explanationContainer: {
    marginTop: SIZES.margin * 2,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  explanationText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
