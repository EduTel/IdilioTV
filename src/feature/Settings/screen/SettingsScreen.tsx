import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { supabase } from '../../auth/lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';

const handleLogout = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  } catch (error) {
    console.error('Unexpected error during logout:', error);
  }
};

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="#d32f2f"
          textColor="white"
          icon="logout"
        >
          Cerrar Sesión
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  logoutButton: {
    marginTop: 'auto',
    paddingVertical: 8,
    borderRadius: 8,
  },
});
