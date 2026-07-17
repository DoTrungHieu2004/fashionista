import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useTheme } from '../../theme/provider/ThemeProvider';

const BrandBox = ({ name, logoUrl }: { name: string; logoUrl: string }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.brandBox,
        { borderColor: colors.surfaceContainer, backgroundColor: colors.surfaceContainer },
      ]}>
      <Image source={{ uri: logoUrl }} style={styles.brandLogo} resizeMode="contain" />
    </View>
  );
};

export default BrandBox;

const styles = StyleSheet.create({
  brandBox: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 12,
  },
  brandLogo: { width: 80, height: 24 },
});
