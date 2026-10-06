import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useTheme } from '@/theme/useTheme';

interface AuthInputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
  rightLinkText?: string;
  onRightLinkPress?: () => void;
  rightIcon?: React.ReactNode;
}

export function AuthInput({
  label,
  isPassword,
  rightLinkText,
  onRightLinkPress,
  rightIcon,
  ...props
}: AuthInputProps) {
  const { colors, spacing, radius, fonts } = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.labelRow, { marginBottom: spacing.sm }]}>
        <Text
          style={[styles.label, { color: colors.onSurfaceVariant, fontFamily: fonts.inter.medium }]}
        >
          {label}
        </Text>
        {rightLinkText && (
          <TouchableOpacity onPress={onRightLinkPress}>
            <Text
              style={[styles.rightLink, { color: colors.primary, fontFamily: fonts.inter.medium }]}
            >
              {rightLinkText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: colors.surfaceVariant,
            borderRadius: radius.md,
            backgroundColor: colors.surfaceBright,
            paddingHorizontal: spacing.md,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.onSurface }]}
          placeholderTextColor={colors.outline}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {rightIcon ? (
          <View style={styles.iconContainer}>{rightIcon}</View>
        ) : isPassword ? (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color={colors.outline} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
  rightLink: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, height: 48 },
  iconContainer: { width: 24, height: 24, justifyContent: 'center' },
  input: { flex: 1, fontSize: 16, height: '100%' },
});
