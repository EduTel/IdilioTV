import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-url-polyfill/auto';
import { useSession } from '../../shared/hooks/session';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
//import { RootStackParamList } from './types';
import { AuthNavigator } from '../../feature/auth/navigator/authNavigator';
import { AppNavigator } from './AppNavigator';

//const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { session, loading: loadingSession } = useSession();

  if (loadingSession)
    return (
      <View style={styles.loadingSession}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );

  const isAuth = !!session?.user;

  return (
    <NavigationContainer>
      {isAuth ? <AppNavigator key="app" /> : <AuthNavigator key="auth" />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingSession: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
