import { FlatList, Image, Pressable, StyleSheet, Text } from 'react-native';
import VeriticallCarousel from '../components/VeriticallCarousel';
import { useCatalog, useShowsMain } from '../hooks/useHomeRails';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorApi from '../../../shared/components/ErrorApi';
import LoadingApi from '../../../shared/components/LoadingApi';
import { useCallback, useState } from 'react';
import { Button } from 'react-native-paper';
import { GetTitlesResponse } from '../api/catalog.api';

type BannerProps = {
  posterUrl: string;
  onPress: () => void;
};

const Banner = ({ posterUrl, onPress }: BannerProps) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={{ uri: posterUrl }}
        style={styles.banner}
        resizeMode="cover"
      />
    </Pressable>
  );
};
const EMPTY: any[] = [];

const HomeScreen = () => {
  const { data, isLoading, isError } = useCatalog();

  const dataMain = useShowsMain();
  const [render, setRender] = useState(0);

  const nav = useNavigation<any>();

  const firstItemId = dataMain.data?.items?.[0]?.id ?? '';
  const posterUrl = dataMain.data?.items?.[0]?.poster_url ?? '';

  const onPressBanner = useCallback(() => {
    nav.navigate('CatalogInfo', { showId: firstItemId });
  }, [nav, firstItemId]);

  const onPressItem = useCallback(
    (id: string) => nav.navigate('CatalogInfo', { showId: id }),
    [nav],
  );
  const renderItem = useCallback(
    (dataRender: { item: any }) => (
      <VeriticallCarousel
        title={dataRender.item?.categoryName ?? ''}
        items={dataRender.item?.items ?? EMPTY}
        onPressItem={onPressItem}
      />
    ),
    [onPressItem],
  );

  const ListHeaderComponent = useCallback(
    () => <Banner posterUrl={posterUrl} onPress={onPressBanner} />,
    [onPressBanner, posterUrl],
  );
  const keyExtractor = useCallback(
    (r: GetTitlesResponse | undefined) => r?.categoryId ?? '',
    [],
  );

  if (isLoading) return <LoadingApi />;
  if (isError) return <ErrorApi />;

  return (
    <SafeAreaView style={styles.flex}>
      <Button onPress={() => setRender(prev => prev + 1)}>Click</Button>
      <Text style={styles.whiteText}>{render}</Text>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={renderItem}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  whiteText: {
    color: 'white',
  },
  loading: {
    flex: 1,
  },
  flex: {
    flex: 1,
    backgroundColor: 'black',
  },
  banner: {
    width: '70%',
    height: 300,
    alignSelf: 'center',
  },
  list: { flex: 1 },
});
