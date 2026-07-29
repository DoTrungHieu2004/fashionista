import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../theme/ThemeProvider';
import { addOpacity } from '../../utils/colours';

const SplashScreen = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate the progress bar from 0% to 100% over 3000ms (3 seconds)
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Width animation must be driven on JS thread
    }).start();
  }, [progress]);

  // Interpolate the animated value to a CSS percentage string
  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const { colours, images, spacing, fonts } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: colours.background }]}>
        <View style={styles.content}>
          <Image source={images.logo} style={[styles.logo, { marginBottom: spacing.stackLg }]} resizeMode="contain" />
          <Text style={[styles.title, { color: colours.primary, fontFamily: fonts.heading }]}>FASHIONISTA</Text>

          <View style={[styles.loaderContainer, { backgroundColor: addOpacity(colours.primary, 10) }]}>
            <Animated.View
              style={[styles.loaderActive, { width: widthInterpolated, backgroundColor: colours.primary }]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', justifyContent: 'center' },
  logo: { width: 120, height: 120 },
  title: { fontSize: 24, fontWeight: 'semibold', lineHeight: 32, letterSpacing: 3.6, marginBottom: 40 },
  loaderContainer: { width: 120, height: 3, borderRadius: 2, overflow: 'hidden' },
  loaderActive: { height: '100%', borderRadius: 2 },
});
