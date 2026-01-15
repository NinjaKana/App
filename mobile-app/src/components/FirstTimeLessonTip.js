/**
 * First Time Lesson Tip Component
 * Modal qui explique comment utiliser une leçon (première fois uniquement)
 * Inspiré de Duolingo Tips
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SIZES } from '../styles/theme';

const STORAGE_KEY = 'first_time_lesson_tip_shown';

export default function FirstTimeLessonTip({ visible, onClose, lessonId = 1 }) {
  const maxErrors = lessonId <= 3 ? 5 : 3;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icon */}
          <Text style={styles.emoji}>📚</Text>

          {/* Title */}
          <Text style={styles.title}>Comment ça marche ?</Text>

          {/* Steps */}
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>1️⃣</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Étudie les caractères</Text>
                <Text style={styles.stepText}>
                  Prends le temps de bien regarder chaque caractère, écoute la prononciation
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>2️⃣</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Mémorise-les</Text>
                <Text style={styles.stepText}>
                  Essaie de les retenir par cœur. Plus tu mémorises, mieux c'est !
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>3️⃣</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Lance le quiz</Text>
                <Text style={styles.stepText}>
                  Quand tu es prêt, commence les exercices pour tester tes connaissances
                </Text>
              </View>
            </View>
          </View>

          {/* Important note */}
          <View style={styles.noteCard}>
            <Text style={styles.noteIcon}>⚠️</Text>
            <Text style={styles.noteText}>
              {maxErrors} erreurs consécutives = -1 vie. Mémorise bien avant de commencer !
            </Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.gotItButton} onPress={onClose}>
            <Text style={styles.gotItButtonText}>J'ai compris !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Fonctions utilitaires
export const shouldShowFirstTimeTip = async () => {
  try {
    const shown = await AsyncStorage.getItem(STORAGE_KEY);
    return shown !== 'true';
  } catch (error) {
    console.error('Error checking first time tip:', error);
    return true; // Par défaut, on affiche
  }
};

export const markFirstTimeTipAsShown = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
  } catch (error) {
    console.error('Error marking first time tip as shown:', error);
  }
};

export const resetFirstTimeTip = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting first time tip:', error);
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius * 2,
    padding: SIZES.padding * 2,
    width: '100%',
    maxWidth: 400,
  },
  emoji: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  title: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  stepsContainer: {
    marginBottom: SIZES.margin * 2,
  },
  step: {
    flexDirection: 'row',
    marginBottom: SIZES.margin * 1.5,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 28,
    marginRight: SIZES.margin,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  stepText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.warning + '20',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin * 2,
    alignItems: 'center',
  },
  noteIcon: {
    fontSize: 24,
    marginRight: SIZES.margin,
  },
  noteText: {
    flex: 1,
    fontSize: FONTS.medium,
    color: COLORS.text,
    lineHeight: 20,
  },
  gotItButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  gotItButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
});
