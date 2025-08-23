import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import { supabase } from '../lib/supabase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session: newSession },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!newSession)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../../assets/login.png')}
        resizeMode="cover"
        style={styles.mainImageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.container}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="password"
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              disabled={loading}
              onPress={() => signInWithEmail()}
              mode="contained"
            >
              Sign in
            </Button>
          </View>
          <View style={styles.verticallySpaced}>
            <Button
              disabled={loading}
              onPress={() => signUpWithEmail()}
              mode="contained"
            >
              Sign up
            </Button>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  mainImageBackground: {
    height: '100%',
  },
  imageStyle: { opacity: 0.7 },
});
