import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadingApi = () => {
  return (
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" color="black" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingApi;
