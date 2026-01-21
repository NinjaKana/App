/**
 * App.js - Point d'entrée de l'application
 */

// IMPORTANT: react-native-gesture-handler doit être importé en premier
import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { PremiumProvider, usePremium } from './src/contexts/PremiumContext';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import PaywallModal from './src/components/PaywallModal';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { isOnboardingCompleted } from './src/services/onboardingService';
import { trackSession } from './src/services/reviewService';
import {
  configureNotifications,
  requestPermissions,
  scheduleAllNotifications,
  isNotificationAvailable
} from './src/services/notificationService';

// Composant wrapper pour le Paywall global
function AppWithPaywall() {
  const { showPaywall, closePaywall, handlePurchaseSuccess } = usePremium();
  const { colors, isDarkMode, isLoading: themeLoading } = useTheme();
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    // Track session for review prompt
    await trackSession();

    // Initialize push notifications for retention
    if (isNotificationAvailable()) {
      configureNotifications();
      const { granted } = await requestPermissions();
      if (granted) {
        await scheduleAllNotifications();
      }
    }

    // Check onboarding status
    await checkOnboarding();
  };

  const checkOnboarding = async () => {
    // TEMP: Force onboarding pour test - remettre à false après
    const FORCE_ONBOARDING = false;

    if (FORCE_ONBOARDING) {
      setShowOnboarding(true);
      return;
    }

    const completed = await isOnboardingCompleted();
    setShowOnboarding(!completed);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // Loading state
  if (showOnboarding === null || themeLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Show onboarding for new users
  if (showOnboarding) {
    return (
      <>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </>
    );
  }

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <AppNavigator />
      <PaywallModal
        visible={showPaywall}
        onClose={closePaywall}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <PremiumProvider>
          <AppWithPaywall />
        </PremiumProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
