import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import CatalogInfo from '../../feature/catalogInfo/screen/catalogInfo';

const AppStackNav = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <AppStackNav.Navigator initialRouteName="TabsHome">
      <AppStackNav.Screen
        name="TabsHome"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <AppStackNav.Screen
        name="CatalogInfo"
        component={CatalogInfo}
        options={{ title: 'Detalle' }}
      />
    </AppStackNav.Navigator>
  );
}
