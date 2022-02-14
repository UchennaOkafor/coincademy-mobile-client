import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
	Text,
} from 'react-native';
import { Theme } from 'styles/Index';
import { useUserStore } from 'state/useUserStore';
import Spacer from 'components/common/Spacer';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import SettingsSections from 'components/settings/SettingsSections';
import SettingsListData from 'resources/SettingsListData';

const Settings = (): JSX.Element => {
  const navigation = useNavigation();
  const state = useUserStore();
  const sections = SettingsListData.getSettingsSections();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Spacer />
        <SettingsSections
          sections={sections}
          onItemPressed={async (id: string) => {
            switch(id) {
              case 'privacy_policy':
                WebBrowser.openBrowserAsync('https://expo.dev')
                break;

              case 'terms_of_service':
                WebBrowser.openBrowserAsync('https://expo.dev')
                break;

              case 'logout':
                await state.logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }]
                });
                break;

              case 'clear_cache':
                await state.clearCache();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Onboarding' }]
                });
                break;
            }
          }}
        />
      </ScrollView>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>v{Constants.manifest?.version}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.spacingM,
    backgroundColor: Theme.colors.backgroundGray
  },
  versionContainer: {
    alignSelf: 'center', 
    marginBottom: Theme.spacing.spacingL
  },
  versionText: {
    ...Theme.typography.text.h7, 
    ...Theme.typography.weight.normal, 
    color: Theme.colors.gray
  }
});

export default Settings;