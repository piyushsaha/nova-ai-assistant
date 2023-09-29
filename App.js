import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: 'white' }}>
      <StatusBar style='dark' />
      <SafeAreaView style={{ flex: 1 }}>
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
