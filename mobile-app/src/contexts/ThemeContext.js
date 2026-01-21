/**
 * ThemeContext - Gestion du thème dark/light
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@ninjakana_theme';

// Couleurs du thème Dark (actuel)
const darkColors = {
  // Couleurs principales
  primary: '#e74c3c',
  primaryDark: '#c0392b',
  primaryLight: '#ff6b6b',

  // Accent violet
  accent: '#8b5cf6',
  accentLight: '#a78bfa',
  accentSecondary: '#f093fb',

  // Couleurs de fond
  background: '#1a1a2e',
  backgroundLight: '#16213e',
  backgroundDark: '#0f0f1e',

  // Couleurs de surface (cartes, modales)
  surface: '#16213e',
  surfaceLight: '#1e2f4f',
  surfaceDark: '#0f1929',

  // Couleurs de texte
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  textMuted: '#808080',
  textOnPrimary: '#ffffff',

  // Couleurs d'état
  success: '#2bb3c0',
  error: '#e6a341',
  warning: '#ffa726',
  info: '#29b6f6',

  // Vies
  lives: '#ff6b9d',
  livesGradientStart: '#ff6b9d',
  livesGradientEnd: '#c44569',

  // SRS
  srsEasy: '#2bb3c0',
  srsGood: '#29b6f6',
  srsHard: '#ffa726',
  srsAgain: '#e6a341',
  srsPerfect: '#9c27b0',

  // Badges
  badgeGold: '#ffd700',
  badgeSilver: '#c0c0c0',
  badgeBronze: '#cd7f32',

  // Streak
  streakFire: '#ff6348',

  // XP
  xpBar: '#4caf50',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',

  // Bordures
  border: '#2d3561',
  borderLight: '#3d4571',

  // Transparent
  transparent: 'transparent',

  // Navigation
  tabBarBackground: '#16213e',
  tabBarActive: '#e74c3c',
  tabBarInactive: '#808080',

  // Input
  inputBackground: '#1e2f4f',
  inputBorder: '#3d4571',
  placeholder: '#808080',
};

// Couleurs du thème Light (nouveau)
const lightColors = {
  // Couleurs principales (identiques)
  primary: '#e74c3c',
  primaryDark: '#c0392b',
  primaryLight: '#ff6b6b',

  // Accent violet
  accent: '#8b5cf6',
  accentLight: '#a78bfa',
  accentSecondary: '#f093fb',

  // Couleurs de fond
  background: '#F8F9FA',
  backgroundLight: '#FFFFFF',
  backgroundDark: '#EEEEEE',

  // Couleurs de surface (cartes, modales)
  surface: '#FFFFFF',
  surfaceLight: '#F5F5F5',
  surfaceDark: '#EEEEEE',

  // Couleurs de texte
  text: '#1A1A2E',
  textSecondary: '#666666',
  textMuted: '#999999',
  textOnPrimary: '#ffffff',

  // Couleurs d'état (style Figma - vert/rouge classique)
  success: '#4CAF50',
  error: '#E53935',
  warning: '#FF9800',
  info: '#2196F3',

  // Vies
  lives: '#ff6b9d',
  livesGradientStart: '#ff6b9d',
  livesGradientEnd: '#c44569',

  // SRS
  srsEasy: '#4CAF50',
  srsGood: '#2196F3',
  srsHard: '#FF9800',
  srsAgain: '#E53935',
  srsPerfect: '#9c27b0',

  // Badges
  badgeGold: '#ffd700',
  badgeSilver: '#c0c0c0',
  badgeBronze: '#cd7f32',

  // Streak
  streakFire: '#ff6348',

  // XP
  xpBar: '#4caf50',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // Bordures
  border: '#E8E8E8',
  borderLight: '#F0F0F0',

  // Transparent
  transparent: 'transparent',

  // Navigation
  tabBarBackground: '#FFFFFF',
  tabBarActive: '#e74c3c',
  tabBarInactive: '#999999',

  // Input
  inputBackground: '#F5F5F5',
  inputBorder: '#E8E8E8',
  placeholder: '#999999',
};

// Gradients
const darkGradients = {
  primary: ['#667eea', '#764ba2'],
  card: ['#16213e', '#0f1929'],
  lives: ['#ff6b9d', '#c44569'],
  success: ['#2bb3c0', '#1f8f9a'],
  accent: ['#f093fb', '#f5576c'],
  questionCard: ['#26A69A', '#00897B'],
};

const lightGradients = {
  primary: ['#667eea', '#764ba2'],
  card: ['#FFFFFF', '#F8F9FA'],
  lives: ['#ff6b9d', '#c44569'],
  success: ['#66BB6A', '#4CAF50'],
  accent: ['#f093fb', '#f5576c'],
  questionCard: ['#26A69A', '#00897B'],
};

// Shadows
const darkShadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
};

const lightShadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Charger le thème sauvegardé
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Erreur chargement thème:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Erreur sauvegarde thème:', error);
    }
  };

  const setTheme = async (mode) => {
    try {
      const darkMode = mode === 'dark';
      setIsDarkMode(darkMode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Erreur sauvegarde thème:', error);
    }
  };

  const theme = {
    isDarkMode,
    colors: isDarkMode ? darkColors : lightColors,
    gradients: isDarkMode ? darkGradients : lightGradients,
    shadows: isDarkMode ? darkShadows : lightShadows,
    toggleTheme,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
