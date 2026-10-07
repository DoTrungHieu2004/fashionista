import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TABS } from '@/constants/tabs';
import { type MainTabKey } from '@/navigation/types';
import { useTheme } from '@/theme/useTheme';

interface Props {
  tabKey: MainTabKey;
}

export function PlaceholderScreen({ tabKey }: Props) {
  const { colors, fonts, spacing } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const def = TABS.find((tab) => tab.key === tabKey);
  const title = def ? t(def.labelKey) : tabKey;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + spacing.lg,
          paddingHorizontal: spacing.containerMargin,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: colors.onBackground, fontFamily: fonts.montserrat.semibold },
        ]}
      >
        {title}
      </Text>
      <View style={{ height: spacing.sm }} />
      <Text
        style={[styles.tabKey, { color: colors.onSurfaceVariant, fontFamily: fonts.inter.regular }]}
      >
        {tabKey}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 28 },
  tabKey: { fontSize: 14 },
});
