/**
 * Ad Shim - Conditional import for react-native-google-mobile-ads
 * Returns mocks on web/unsupported platforms to allow dev testing
 */

import { Platform } from 'react-native';

const isNativeSupported = Platform.OS === 'ios' || Platform.OS === 'android';

let RewardedAd = null;
let RewardedAdEventType = {};
let AdEventType = {};

if (isNativeSupported) {
  try {
    const ads = require('react-native-google-mobile-ads');
    RewardedAd = ads.RewardedAd;
    RewardedAdEventType = ads.RewardedAdEventType;
    AdEventType = ads.AdEventType;
  } catch (e) {
    // Native module not available (Expo Go)
  }
}

// Mock for web/Expo Go
if (!RewardedAd) {
  RewardedAd = {
    createForAdRequest: () => ({
      load: () => {},
      show: () => Promise.resolve(),
      addAdEventListener: () => () => {},
    }),
  };
  RewardedAdEventType = {
    LOADED: 'loaded',
    EARNED_REWARD: 'earned_reward',
  };
  AdEventType = {
    ERROR: 'error',
    CLOSED: 'closed',
  };
}

export { RewardedAd, RewardedAdEventType, AdEventType };
