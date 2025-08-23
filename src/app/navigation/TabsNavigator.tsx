import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Fontisto,
  FontistoIconName,
} from '@react-native-vector-icons/fontisto';
import SettingsScreen from '../../feature/Settings/screen/SettingsScreen';
import HomeScreen from '../../feature/Catalog/screens/HomeScreen';

const Tab = createBottomTabNavigator();

const TAB_CONFIG: Record<
  string,
  {
    name: string;
    label: string;
    icon: FontistoIconName;
    component: React.ComponentType;
  }
> = {
  Catalog: {
    name: 'Catalog',
    label: 'Catalogo',
    icon: 'home',
    component: HomeScreen,
  },
  settings: {
    name: 'Settings',
    label: 'Settings',
    icon: 'adjust',
    component: SettingsScreen,
  },
};

const createTabBarIcon =
  (iconName: FontistoIconName) =>
  ({ color, size = 24 }: { color: string; size?: number }) =>
    <Fontisto name={iconName} color={color} size={size} />;

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {Object.values(TAB_CONFIG).map(({ name, label, icon, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: label,
            tabBarIcon: createTabBarIcon(icon),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabsNavigator;
