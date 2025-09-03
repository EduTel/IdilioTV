import { View, Text, StyleSheet } from 'react-native';
import HorizontalCarousel from './HorizontalCarousel';
import { Titles } from '../api/catalog.api';
import { memo } from 'react';

type RailProps = {
  title: string;
  items: Titles[];
  onPressItem: (id: string) => void;
};

function VeriticallCarousel({ title, items, onPressItem }: RailProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.titleUnderline} />
      </View>
      <View style={styles.carouselContainer}>
        <HorizontalCarousel data={items} onPress={onPressItem} />
      </View>
    </View>
  );
}

export default memo(VeriticallCarousel);

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  title: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 22,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 8,
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#007AFF',
    borderRadius: 2,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  carouselContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
