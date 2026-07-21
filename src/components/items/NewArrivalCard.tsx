import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../theme/provider/ThemeProvider';
import { mallNewArrivals } from '../../data/sampleData';

const NewArrivalCard = ({
  item,
  isLarge,
}: {
  item: (typeof mallNewArrivals)[0];
  isLarge?: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.newArrivalItem, isLarge && styles.newArrivalLarge]}>
      <Image source={{ uri: item.imageUrl }} style={styles.newArrivalImage} resizeMode="cover" />
      <View style={styles.newArrivalOverlay}>
        {item.tag && (
          <View style={[styles.tagBadge, { backgroundColor: colors.secondary }]}>
            <Text style={styles.tagBadgeText}>{item.tag}</Text>
          </View>
        )}
        <Text style={styles.newArrivalTitle}>{item.title}</Text>
      </View>
    </View>
  );
};

export default NewArrivalCard;

const styles = StyleSheet.create({
  newArrivalItem: {
    width: 140,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 12,
  },
  newArrivalLarge: { width: 240, height: 280 },
  newArrivalImage: { width: '100%', height: '100%' },
  newArrivalOverlay: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  tagBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  tagBadgeText: { color: '#ffffff', fontSize: 10, fontWeight: '600', fontFamily: 'Montserrat' },
  newArrivalTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Montserrat',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
