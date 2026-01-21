/**
 * App Navigator - Configuration de la navigation principale
 * Utilise React Navigation avec Stack et Bottom Tabs
 */

import React from 'react';
import { Text, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LessonsScreen from '../screens/LessonsScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import SRSScreen from '../screens/SRSScreen';
import SRSReviewScreen from '../screens/SRSReviewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

// Composant simple pour les icônes de tab (emoji)
function TabIcon({ emoji }) {
  return (
    <Text style={{ fontSize: 24, textAlign: 'center' }}>{emoji}</Text>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator pour les écrans principaux
function MainTabs() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: Math.max(insets.bottom, 16),
          paddingTop: 10,
          height: 80 + Math.max(insets.bottom - 8, 0),
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="🏠" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          tabBarLabel: 'Leçons',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="📚" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SRS"
        component={SRSScreen}
        options={{
          tabBarLabel: 'Révisions',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="🧠" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="👤" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator principal avec theme
function MainStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LessonDetail"
        component={LessonDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SRSReview"
        component={SRSReviewScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          title: 'Classement',
        }}
      />
    </Stack.Navigator>
  );
}

// App Navigator avec NavigationContainer
function AppNavigator() {
  const { colors, isDarkMode } = useTheme();

  // Custom navigation theme - extend from default themes to get fonts
  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    dark: isDarkMode,
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <MainStack />
    </NavigationContainer>
  );
}

export default AppNavigator;
