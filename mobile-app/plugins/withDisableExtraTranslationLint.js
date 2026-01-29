const { withAppBuildGradle } = require("expo/config-plugins");

module.exports = function withDisableExtraTranslationLint(config) {
  return withAppBuildGradle(config, (config) => {
    const buildGradle = config.modResults.contents;

    // Add lintOptions to disable ExtraTranslation error
    // This is needed because locales/fr.json contains iOS-only keys
    // (CFBundleDisplayName, NSUserTrackingUsageDescription) that Expo
    // also generates into Android strings.xml, causing lint to fail.
    if (!buildGradle.includes("ExtraTranslation")) {
      const target = "android {";
      const lintBlock = `android {
    lint {
        disable 'ExtraTranslation'
    }`;
      config.modResults.contents = buildGradle.replace(target, lintBlock);
    }

    return config;
  });
};
