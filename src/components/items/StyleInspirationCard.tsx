import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { styleInspirations } from '../../data/sampleData';

const StyleInspirationCard = ({ item }: { item: (typeof styleInspirations)[0] }) => {
  return (
    <View style={styles.inspirationCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.inspirationImage} resizeMode="cover" />
      <View style={styles.inspirationOverlay}>
        <Text style={styles.inspirationTitle}>{item.title}</Text>
        <Text style={styles.inspirationSubtitle}>{item.subtitle}</Text>
        <TouchableOpacity style={styles.inspirationButton}>
          <Text style={styles.inspirationButtonText}>Explore collection</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StyleInspirationCard;

const styles = StyleSheet.create({
  inspirationCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  inspirationImage: { width: '100%', height: '100%' },
  inspirationOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inspirationTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '300',
    fontFamily: 'MontserratRegular',
    marginBottom: 4,
  },
  inspirationSubtitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'MontserratRegular',
    marginBottom: 16,
  },
  inspirationButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  inspirationButtonText: {
    color: '#ffffff',
    fontWeight: '300',
    fontSize: 16,
    fontFamily: 'InterRegular',
  },
});
