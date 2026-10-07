import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomTabBar } from '@/components/navigation/BottomTabBar';
import { DEFAULT_TAB, TABS } from '@/constants/tabs';
import { PlaceholderScreen } from '@/screens/placeholder/PlaceholderScreen';
import { useTheme } from '@/theme/useTheme';

/**
 * Mounted by the root stack as the `Main` route.
 *
 * Tab switching is local state, not a navigator. All five tabs remain
 * mounted; the inactive ones are hidden with `display: 'none'` so their
 * component state, scroll offsets, and network calls survive switches —
 * matching the behaviour users expect from native tab bars.
 */
export function MainTabs() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {TABS.map((tab) => {
          const active = tab.key === activeTab;

          return (
            <View
              key={tab.key}
              style={[StyleSheet.absoluteFill, !active && styles.hidden]}
              // Prevents VoiceOver/TalkBack from focusing hidden tabs.
              accessibilityElementsHidden={!active}
              importantForAccessibility={active ? 'auto' : 'no-hide-descendants'}
              pointerEvents={active ? 'auto' : 'none'}
            >
              <PlaceholderScreen tabKey={tab.key} />
            </View>
          );
        })}
      </View>

      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1 },
  hidden: { display: 'none' },
});
