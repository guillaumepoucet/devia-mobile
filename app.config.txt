const baseConfig = {
  name: "devia-mobile",
  slug: "devia-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#f2eee3"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/splash.png",
      backgroundColor: "#f2eee3"
    },
    softwareKeyboardLayoutMode: "pan",
    package: "com.poucetguillaume.deviamobile"
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [ "expo-router" ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    // router: {
    //   origin: false
    // },
    eas: {
      projectId: "af706490-08ed-4f56-9182-f537e56a95bf"
    }
  },
  owner: "poucetguillaume"
};

export default ({ config }) => {
  const isPreview = process.env.APP_ENV === "preview";

  return {
    ...baseConfig,
    name: isPreview ? "Devia Preview" : "Devia Mobile",
    // slug: isPreview ? "devia-preview" : "devia-mobile",
    slug: "devia-mobile",
    android: {
      ...baseConfig.android,
      package: isPreview
        ? "com.poucetguillaume.deviamobilepreview"
        : "com.poucetguillaume.deviamobile"
    },
    ios: {
      ...baseConfig.ios,
      bundleIdentifier: isPreview
        ? "com.poucetguillaume.deviamobilepreview"
        : "com.poucetguillaume.deviamobile"
    }
  };
};
