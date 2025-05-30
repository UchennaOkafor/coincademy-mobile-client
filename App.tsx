import 'react-native-gesture-handler';
import '@locales/Localization';
import 'config/FirebaseSetup';

import {StatusBar} from 'expo-status-bar';
import {useFonts} from 'expo-font';
import React from 'react';
import {StyleProp, useColorScheme, ViewStyle} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootNavigation from '@app/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useLocalStore} from 'state/useLocalStore';
import {Theme} from '@styles/Index';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

export default function App() {
  const [loaded] = useFonts({
    'Inter-Black': require('@assets/fonts/Inter/Inter-Black.ttf'),
    'Inter-Bold': require('@assets/fonts/Inter/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('@assets/fonts/Inter/Inter-ExtraBold.ttf'),
    'Inter-ExtraLight': require('@assets/fonts/Inter/Inter-ExtraLight.ttf'),
    'Inter-Light': require('@assets/fonts/Inter/Inter-Light.ttf'),
    'Inter-Medium': require('@assets/fonts/Inter/Inter-Medium.ttf'),
    'Inter-Regular': require('@assets/fonts/Inter/Inter-Regular.ttf'),
    'Inter-SemiBold': require('@assets/fonts/Inter/Inter-SemiBold.ttf'),
    'Inter-Thin': require('@assets/fonts/Inter/Inter-Thin.ttf')
  });

  const localStore = useLocalStore();
  const isDarkMode = useColorScheme() === 'dark';

  if (!loaded) {
    return null;
  }

  //Colors.lighter
  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Theme.colors.backgroundGray,
    flex: 1
  };

  return (
    <SafeAreaProvider style={backgroundStyle}>
      <StatusBar 
        style="dark"
        animated={true}
        backgroundColor={Theme.colors.backgroundGray} 
      />
      <QueryClientProvider client={queryClient}>
        <RootNavigation
          onboarded={localStore.user.onboarded}
          authenticated={localStore.user.onboarded}
          authToken=""
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
