import { useCallback } from 'react';
import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Titles } from '../api/catalog.api';

type HorizontalCarouselProps = {
  data: Titles[];
  onPress: (id: string) => void;
};

export default function HorizontalCarousel({
  data,
  onPress,
}: HorizontalCarouselProps) {
  const keyExtractor = useCallback((i: Titles) => i.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Titles }) => (
      <Pressable onPress={() => onPress(item.id)} style={styles.pressable}>
        <Image source={{ uri: item.poster_url }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </Pressable>
    ),
    [onPress],
  );

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      maxToRenderPerBatch={3}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  pressable: {
    marginRight: 12,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});
