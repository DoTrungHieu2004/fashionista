import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../../theme/provider/ThemeProvider';
import { styles } from './styles';
import InputField from '../../components/InputField';

const ForgotPasswordScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 20 }}>
        <Feather name="arrow-left" size={24} color={colors.onSurfaceVariant} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        <Image
          source={require('../../../assets/images/heroes/forgot_pass_hero.png')}
          style={localStyles.heroImage}
          resizeMode="cover"
        />

        <Text style={[styles.headerTitle, { marginBottom: 16, color: colors.onSurface }]}>
          Forgot Password
        </Text>
        <Text style={[styles.subtitle, { marginBottom: 24, color: colors.onSurfaceVariant }]}>
          Enter the email address associated with your account and we'll send you a link to reset
          your password.
        </Text>

        <InputField
          label=""
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          iconName="mail"
          iconLibrary="Feather"
        />

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('ResetPassword' as never)}>
          <Text style={styles.buttonText}>Send reset link</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const localStyles = StyleSheet.create({
  heroImage: { width: '100%', height: 220, borderRadius: 16, marginTop: 8, marginBottom: 16 },
});
