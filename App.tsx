import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigation from '@app/navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import { useUserStore } from 'state/useUserStore';

export default function App() {
  LogBox.ignoreLogs(['Require cycle: node_modules/react-native/Libraries/Network/fetch.js']);

  const [loaded] = useFonts({
    'Inter-Black': require('@assets/fonts/Inter/Inter-Black.ttf'),
    'Inter-Bold': require('@assets/fonts/Inter/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('@assets/fonts/Inter/Inter-ExtraBold.ttf'),
    'Inter-ExtraLight': require('@assets/fonts/Inter/Inter-ExtraLight.ttf'),
    'Inter-Light': require('@assets/fonts/Inter/Inter-Light.ttf'),
    'Inter-Medium': require('@assets/fonts/Inter/Inter-Medium.ttf'),
    'Inter-Regular': require('@assets/fonts/Inter/Inter-Regular.ttf'),
    'Inter-SemiBold': require('@assets/fonts/Inter/Inter-SemiBold.ttf'),
    'Inter-Thin': require('@assets/fonts/Inter/Inter-Thin.ttf'),
  });

  const userStore = useUserStore();
  const isDarkMode = useColorScheme() === 'dark';
  
  if (!loaded) {
    return null;
  }

  //Colors.lighter
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#f5f5f7',
    flex: 1,
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar style="dark" backgroundColor="#f5f5f7" />
      <RootNavigation 
        onboarded={userStore.misc.onboarded}
        authenticated={userStore.misc.signedIn}
        authToken="EMTPY_TOKEN"
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
