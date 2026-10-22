import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Feather } from '@expo/vector-icons';

import { useTheme } from '@/theme/useTheme';
import { type FeaturedCampaign as FeaturedCampaignData } from '@/types';
import { withOpacity } from '@/utils/color';

interface FeaturedCampaignProps {
  campaign: FeaturedCampaignData;
  onCtaPress?: (campaignId: string) => void;
}

export function FeaturedCampaign({ campaign, onCtaPress }: FeaturedCampaignProps) {
  const { colors, neutral, fonts, spacing, radius } = useTheme();

  const { id, tag, headline, supportingText, ctaLabel, secondaryLabel, imageUrl } = campaign;

  return (
    <View style={[styles.wrapper, { paddingTop: spacing.xs, paddingBottom: spacing.lg }]}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        {/* Linear overlay for text readability */}
        <LinearGradient
          colors={['rgba(9, 9, 11, 0.0)', 'rgba(9, 9, 11, 0.35)', 'rgba(9, 9, 11, 0.9)']}
          locations={[0, 0.5, 1]}
          style={styles.gradient}
        />

        <View style={styles.content}>
          {/* Top: editorial tag */}
          <Text
            style={[styles.tag, { color: colors.secondaryFixed, fontFamily: fonts.inter.semibold }]}
          >
            {tag}
          </Text>

          {/* Middle: headline + supporting text */}
          <View style={styles.textBlock}>
            <Text
              style={[
                styles.headline,
                { color: neutral[50], fontFamily: fonts.montserrat.semibold },
              ]}
            >
              {headline}
            </Text>
            <Text
              style={[
                styles.supporting,
                {
                  color: withOpacity(neutral[50], 0.8),
                  fontFamily: fonts.inter.regular,
                  marginTop: spacing.sm,
                },
              ]}
              numberOfLines={2}
            >
              {supportingText}
            </Text>
          </View>

          {/* Bottom: CTA row */}
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={[
                styles.ctaButton,
                {
                  gap: spacing.sm,
                  backgroundColor: colors.primary,
                  paddingHorizontal: spacing.md,
                  borderRadius: radius.full,
                },
              ]}
              activeOpacity={0.85}
              onPress={() => onCtaPress?.(id)}
              accessibilityRole="button"
              accessibilityLabel={ctaLabel}
            >
              <Text
                style={[styles.ctaLabel, { color: neutral[50], fontFamily: fonts.inter.medium }]}
              >
                {ctaLabel}
              </Text>
              <Feather name="arrow-right" size={16} color={neutral[50]} />
            </TouchableOpacity>

            {secondaryLabel ? (
              <Text
                style={[
                  styles.secondaryLabel,
                  { color: neutral[50], fontFamily: fonts.inter.semibold },
                ]}
              >
                {secondaryLabel}
              </Text>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 20 },
  image: { width: '100%', height: 360, justifyContent: 'space-between' },
  imageStyle: { borderRadius: 20 },
  gradient: { ...StyleSheet.absoluteFill, borderRadius: 20 },
  content: { flex: 1, padding: 20 },
  tag: { fontSize: 10, lineHeight: 14, letterSpacing: 1, textTransform: 'uppercase' },
  textBlock: { marginTop: 12 },
  headline: { fontSize: 28, lineHeight: 35, letterSpacing: -0.7 },
  supporting: { fontSize: 14, lineHeight: 20, maxWidth: '92%' },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  ctaButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  ctaLabel: { fontSize: 12, lineHeight: 16, letterSpacing: 0.3 },
  secondaryLabel: { fontSize: 10, lineHeight: 14, letterSpacing: 0.8 },
});
