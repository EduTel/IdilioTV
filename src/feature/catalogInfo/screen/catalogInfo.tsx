import {
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import LoadingApi from '../../../shared/components/LoadingApi';
import ErrorApi from '../../../shared/components/ErrorApi';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import { RootStackParamList } from '../../../app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { memo, useCallback, useState } from 'react';
import {
  useEpisodes,
  useGetTitle,
  useShowsSeasons,
} from '../hook/useCataloginfo';
import { Episode, Season } from '../api/ICatalogInfoService';

const SeparatorComponent = memo(() => <View style={styles.separator} />);

const renderEpisodeItem = ({ item }: { item: Episode }) => (
  <Pressable style={styles.episodeContainer}>
    <Image
      source={{ uri: item.poster_url }}
      style={styles.episodeImage}
      resizeMode="cover"
    />
    <View style={styles.episodeInfo}>
      <Text style={styles.episodeTitle}>
        {`${item.episode_number} - ${item.name}`}
      </Text>
      <Text style={styles.episodeSynopsis} numberOfLines={3}>
        {item.synopsis || 'Sin descripción disponible'}
      </Text>
    </View>
  </Pressable>
);

const SeasonRow = memo(
  ({ item, onSelect }: { item: Season; onSelect: (id: string) => void }) => (
    <Pressable style={styles.seasonItem} onPress={() => onSelect(item.id)}>
      <Text style={styles.seasonText}>{`Temporada ${item.season_number}`}</Text>
      <Text style={styles.seasonYear}>{item.release_year}</Text>
    </Pressable>
  ),
);

const CatalogInfo = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CatalogInfo'>>();
  const showId = route.params.showId;
  const { data: dataTitle, isLoading: isLoadingTitle } = useGetTitle(showId);
  const { data: seasons, isLoading, isError } = useShowsSeasons(showId);
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>('1');
  const { data: Episodes } = useEpisodes(selectedSeasonId);
  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);

  const onSelectSeason = useCallback((id: string) => {
    setSelectedSeasonId(id);
    hideModal();
  }, []);

  const renderSeasonItem = useCallback(
    ({ item }: { item: Season }) => (
      <SeasonRow item={item} onSelect={onSelectSeason} />
    ),
    [onSelectSeason],
  );

  if (isLoading) return <LoadingApi />;
  if (isError) return <ErrorApi />;

  const showModal = () => setVisible(true);

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingTitle ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.text}>{dataTitle?.items?.title}</Text>
          <Text style={styles.text}>{dataTitle?.items?.synopsis}</Text>
          <Text style={styles.text}>{dataTitle?.items?.release_year}</Text>
        </>
      )}
      {isLoadingTitle ? (
        <ActivityIndicator />
      ) : (
        <>
          <Image
            source={{ uri: dataTitle?.items?.poster_url }}
            style={styles.image}
          />
        </>
      )}
      <View style={styles.header}>
        <Button
          icon="play-circle"
          mode="contained"
          onPress={showModal}
          style={styles.seasonButton}
          contentStyle={styles.seasonButtonContent}
        >
          {`Temporada ${selectedSeasonId}`}
        </Button>
      </View>

      <FlatList
        data={Episodes?.items}
        renderItem={data => renderEpisodeItem({ item: data.item })}
        keyExtractor={item => 'selectedSeason:' + item.id}
        contentContainerStyle={styles.episodesList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={SeparatorComponent}
        initialNumToRender={5}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.text}>Seleccionar Temporada</Text>
            <Button onPress={hideModal} mode="text">
              Cerrar
            </Button>
          </View>
          <FlatList
            data={seasons?.items}
            renderItem={renderSeasonItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.seasonsList}
            showsVerticalScrollIndicator={false}
          />
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  seasonButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  seasonButtonContent: {
    paddingVertical: 8,
  },
  episodesList: {
    padding: 16,
  },
  episodeContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  episodeImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  episodeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  episodeTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  episodeSynopsis: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
  },
  separator: {
    height: 8,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  seasonsList: {
    padding: 20,
  },
  seasonItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  seasonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  seasonYear: {
    fontSize: 14,
    color: '#666666',
  },
});

export default CatalogInfo;
