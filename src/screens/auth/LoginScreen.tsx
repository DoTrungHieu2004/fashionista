import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { useTheme } from '../../theme/provider/ThemeProvider';
import InputField from '../../components/InputField';
import { ROUTES } from '../../navigation/routes';

const LoginScreen = () => {
  const { colors, images } = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    const newErrors = { email: '', password: '' };
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);

    if (email && password) {
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.MAIN_TABS as never }],
      });

      console.log(`Login success! || Email: ${email}`);
    }
  };

  return (
    <ImageBackground
      source={images.gradientBackground}
      style={styles.background}
      resizeMode="cover">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, justifyContent: 'center' }}>
          <ScrollView
            contentContainerStyle={{
              padding: 20,
              flexGrow: 1,
              justifyContent: 'center',
            }}>
            {/* Middle transparent / White container */}
            <View style={[styles.card, { backgroundColor: colors.surfaceContainerLowest }]}>
              <Text style={[styles.brandTitle, { color: colors.primary }]}>Fashionista</Text>
              <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Welcome back</Text>
              <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
                Discover the latest trends in luxury fashion.
              </Text>

              {/* Inputs */}
              <InputField
                label="Email address"
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                error={errors.email}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>
                  Password
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
                  <Text style={[styles.forgotPass, { color: colors.primary }]}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
              <InputField
                label=""
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                iconName={showPassword ? 'eye' : 'eye-off'}
                iconLibrary="Feather"
                onIconPress={togglePassword}
              />

              {/* Login button */}
              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={[styles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
                <Text style={[styles.dividerText, { color: colors.outline }]}>
                  OR CONTINUE WITH
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.outlineVariant }]} />
              </View>

              {/* Social buttons */}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    { backgroundColor: colors.surface, borderColor: colors.outlineVariant },
                  ]}>
                  <Image
                    source={require('../../../assets/images/icons/google.png')}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={[styles.socialText, { color: colors.onSurface }]}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.socialButton,
                    { backgroundColor: colors.surface, borderColor: colors.outlineVariant },
                  ]}>
                  <Image
                    source={require('../../../assets/images/icons/facebook.png')}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={[styles.socialText, { color: colors.onSurface }]}>Facebook</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>
                  {' '}
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
                  <Text style={[styles.linkText, { color: colors.primary }]}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
