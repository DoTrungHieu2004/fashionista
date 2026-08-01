import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../theme/ThemeProvider';

interface LabeledInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  toggleSecureEntry?: () => void;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  error?: string;
  iconName?: keyof typeof Feather.glyphMap;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  toggleSecureEntry,
  rightLabel,
  onRightLabelPress,
  error,
  iconName,
}) => {
  const { colours, spacing, fonts } = useTheme();

  return (
    <View style={{ marginBottom: spacing.gutter }}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colours.onSurfaceVariant }]}>{label}</Text>
        {rightLabel && (
          <TouchableOpacity onPress={onRightLabelPress}>
            <Text style={[styles.label, { color: colours.primary }]}>{rightLabel}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={[styles.inputContainer, { backgroundColor: colours.background, borderColor: colours.outlineVariant }]}
      >
        <TextInput
          style={[styles.input, { color: colours.onBackground }]}
          placeholder={placeholder}
          placeholderTextColor={colours.outline}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {iconName && <Feather name={iconName} size={20} color={colours.onSurfaceVariant} />}
        {toggleSecureEntry && (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Feather name={secureTextEntry ? 'eye-off' : 'eye'} size={20} color={colours.onSurfaceVariant} />
          </TouchableOpacity>
        )}

        {error && <Text style={[styles.errorText, { color: colours.error, fontFamily: fonts.body }]}>{error}</Text>}
      </View>
    </View>
  );
};

export default LabeledInput;

const styles = StyleSheet.create({
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 12, fontWeight: 'medium', lineHeight: 16, letterSpacing: 0.6 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  input: { flex: 1, height: '100%', fontSize: 16, fontFamily: 'Inter' },
  errorText: { fontSize: 12, fontWeight: 'regular' },
});
