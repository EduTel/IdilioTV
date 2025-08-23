import { FlatList, Image, Pressable, StyleSheet } from 'react-native';
import VeriticallCarousel from '../components/VeriticallCarousel';
import { useCatalog, useShowsMain } from '../hooks/useHomeRails';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorApi from '../../../shared/components/ErrorApi';
import LoadingApi from '../../../shared/components/LoadingApi';
import { useCallback } from 'react';

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
const HomeScreen = () => {
  const { data, isLoading, isError } = useCatalog();
  const dataMain = useShowsMain();

  const nav = useNavigation<any>();

  const onPressBanner = useCallback(
    () =>
      nav.navigate('CatalogInfo', {
        showId: dataMain?.data?.items[0].id ?? '',
      }),
    [nav, dataMain],
  );

  const onPressItem = useCallback(
    (id: string) => nav.navigate('CatalogInfo', { showId: id }),
    [nav],
  );

  if (isLoading) return <LoadingApi />;
  if (isError) return <ErrorApi />;

  return (
    <SafeAreaView style={styles.flex}>
      <FlatList
        data={data}
        keyExtractor={r => r?.categoryId ?? ''}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={dataRender => (
          <VeriticallCarousel
            title={dataRender.item?.categoryName ?? ''}
            items={dataRender.item?.items ?? []}
            onPressItem={onPressItem}
          />
        )}
        initialNumToRender={3}
        ListHeaderComponent={
          <Banner
            posterUrl={dataMain.data?.items?.[0]?.poster_url ?? ''}
            onPress={onPressBanner}
          />
        }
      />
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
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
