import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Titles } from '../api/catalog.api';

export default function HorizontalCarousel({
  data,
  onPress,
}: {
  data: Titles[];
  onPress: (id: string) => void;
}) {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={i => i.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPress(item.id)} style={styles.pressable}>
          <Image source={{ uri: item.poster_url }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      )}
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
