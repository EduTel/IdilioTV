import LottieView from 'lottie-react-native';
import { View } from 'react-native';

const SplashScreen = () => {
  return (
    <View>
      <LottieView
        source={require('../../../assets/splash.json')}
        autoPlay
        loop
      />
    </View>
  );
};
export default SplashScreen;
