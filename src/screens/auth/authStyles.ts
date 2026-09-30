import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  title: { fontSize: 28, lineHeight: 36 },
  subtitle: { fontSize: 16, lineHeight: 24 },
  primaryButton: {
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  primaryButtonText: { fontSize: 20, lineHeight: 28 },

  // Social login
  dividerContainer: { flexDirection: 'row', alignItems: 'center' },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 12, fontSize: 12, lineHeight: 16, letterSpacing: 1.6 },
  socialContainer: { flexDirection: 'row', justifyContent: 'center' },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 26,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: { width: 24, height: 24, resizeMode: 'contain' },
});
