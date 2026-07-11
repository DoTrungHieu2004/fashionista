import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

import { useTheme } from '../theme/provider/ThemeProvider';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string; // If this has a value, the border turns red
  iconName?: keyof typeof Feather.glyphMap | keyof typeof Ionicons.glyphMap; // Right icon
  iconLibrary?: 'Feather' | 'Ionicons';
  onIconPress?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  iconName,
  iconLibrary = 'Feather',
  onIconPress,
  autoCapitalize = 'none',
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {label ? (
        <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>{label}</Text>
      ) : null}
      <View
        style={[
          styles.inputContainer,
          { borderColor: colors.outlineVariant, backgroundColor: colors.onPrimary },
          error && { borderColor: colors.error },
        ]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          placeholderTextColor={colors.outline}
        />
        {iconName && (
          <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
            {iconLibrary === 'Feather' ? (
              <Feather name={iconName as any} size={20} color={colors.outline} />
            ) : (
              <Ionicons name={iconName as any} size={20} color={colors.outline} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 8, fontFamily: 'InterMedium' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
  },
  input: { flex: 1, fontSize: 16, height: '100%', fontFamily: 'InterRegular' },
  iconContainer: { paddingLeft: 10 },
  errorText: { fontSize: 12, marginTop: 4, fontFamily: 'InterBold' },
});
