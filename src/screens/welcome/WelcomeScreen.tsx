import { useEffect, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { type RootStackScreenProps } from '@/navigation/types';
import { useTheme } from '@/theme/useTheme';
import { withOpacity } from '@/utils/color';

type Props = RootStackScreenProps<'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const { colors, images, fonts, spacing, radius } = useTheme();
  const { t } = useTranslation();

  // Initialize Animated values using useState initializer functions so they are created once
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(20));
  const [progressAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Logo and text entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Loading bar animation & redirect
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500, // 2.5 seconds loading time
      delay: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false, // Width animation doesn't support native driver
    }).start(({ finished }) => {
      if (finished) {
        navigation.replace('Auth', { screen: 'Login' });
      }
    });
  }, [fadeAnim, slideAnim, progressAnim, navigation]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        {/* App name */}
        <Animated.View
          style={[
            { marginBottom: spacing.lg },
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text
            style={[
              styles.appName,
              { color: colors.primaryContainer, fontFamily: fonts.montserrat.semibold },
            ]}
          >
            FASHIONISTA
          </Text>
        </Animated.View>

        {/* Loading bar */}
        <View style={styles.loadingBarContainer}>
          <View
            style={[
              styles.loadingBarTrack,
              {
                backgroundColor: withOpacity(colors.primaryContainer, 0.1),
                borderRadius: radius.full,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.loadingBarFill,
                {
                  backgroundColor: colors.primaryContainer,
                  borderRadius: radius.full,
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Copyright footer */}
      <Animated.View style={[styles.footerContainer, { paddingBottom: spacing.lg }]}>
        <Text
          style={[
            styles.footerText,
            { color: withOpacity(colors.primaryContainer, 0.6), fontFamily: fonts.inter.semibold },
          ]}
        >
          {t('common.copyright', { year: new Date().getFullYear() })}
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { marginBottom: 40 },
  logo: { width: 120, height: 120 },
  appName: { fontSize: 24, lineHeight: 32, letterSpacing: 3.6 },
  loadingBarContainer: { marginTop: 20, alignItems: 'center' },
  loadingBarTrack: { width: 140, height: 3, overflow: 'hidden' },
  loadingBarFill: { height: '100%' },
  footerContainer: { alignItems: 'center' },
  footerText: { fontSize: 14, letterSpacing: 1 },
});
