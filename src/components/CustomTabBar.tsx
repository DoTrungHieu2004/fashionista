import React, { ComponentProps } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../theme/provider/ThemeProvider';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

// Map route keys cleanly to custom icon configurations
const ICON_MAPPING: Record<string, FeatherIconName> = {
  Home: 'home',
  Mall: 'shopping-bag',
  Wishlist: 'heart',
  Orders: 'package',
  Profile: 'user',
};

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors, rounded, spacing } = useTheme();

  return (
    <View style={styles.absoluteContainer}>
      <View
        style={[
          styles.floatingDock,
          {
            backgroundColor: colors.surface,
            borderRadius: rounded.xl,
            paddingHorizontal: spacing.sm,
            shadowColor: colors.primary,
          },
        ]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = ICON_MAPPING[route.name] || 'help-circle';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}>
              {/* Circular bubblr for active items */}
              <View
                style={[
                  styles.iconContainer,
                  isFocused && {
                    backgroundColor: colors.surfaceContainerHigh,
                    borderRadius: rounded.full,
                    transform: [{ translateY: -4 }],
                  },
                ]}>
                <Feather
                  name={iconName}
                  size={20}
                  color={isFocused ? colors.primary : colors.onSurfaceVariant}
                />
              </View>

              <Text
                style={[
                  styles.tabText,
                  { color: isFocused ? colors.primary : colors.onSurfaceVariant },
                ]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  floatingDock: {
    flexDirection: 'row',
    width: '90%',
    height: 68,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8, // Native Android shadows
    shadowRadius: 20,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
  },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' },
  iconContainer: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  tabText: { fontFamily: 'InterMedium', fontSize: 9, marginTop: 2 },
});
