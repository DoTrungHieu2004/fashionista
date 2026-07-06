import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../theme/provider/ThemeProvider';

const SplashScreen = () => {
  const { colors, typography, images } = useTheme();

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />

        <Text style={[typography.headlineLg, styles.title, { color: colors.primaryContainer }]}>
          FASHIONISTA
        </Text>

        <View style={[styles.progressBarContainer, { backgroundColor: colors.primaryFixed }]}>
          <Animated.View
            style={[
              styles.progressBarFill,
              { backgroundColor: colors.primaryContainer, width: widthInterpolation },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 120, height: 120 },
  title: {
    letterSpacing: 3.6,
    marginTop: 40,
    marginBottom: 40,
  },
  progressBarContainer: {
    width: 180,
    height: 4,
    overflow: 'hidden',
    borderRadius: 2,
  },
  progressBarFill: { height: '100%', borderRadius: 2 },
});
