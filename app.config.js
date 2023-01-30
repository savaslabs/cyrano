module.exports = {
    name: 'Cyrano',
    version: '0.0.1',
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      "supportsTablet": true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    packagerOpts: {
      config: "metro.config.js",
      sourceExts: ["js", "jsx", "scss", "sass"]
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission: "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
    extra: {
      accountSID: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN
    },
};