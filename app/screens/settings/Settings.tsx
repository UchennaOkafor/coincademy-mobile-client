import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import {Theme} from 'styles/Index';
import {useUserStore} from 'state/useUserStore';
import Spacer from 'components/common/Spacer';
import Constants from 'expo-constants';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import SettingsSections from 'components/settings/SettingsSections';
import SettingsListData from 'resources/SettingsListData';
import { getAuth } from 'firebase/auth';
import HorizontalProfileCard from 'components/profile/HorizontalProfileCard';

const Settings = (): JSX.Element => {
  const navigation = useNavigation();
  const state = useUserStore();
  const sections = SettingsListData.getSettingsSections();
  const safeAreaInsets = useSafeAreaInsets();
  const user = getAuth().currentUser;

  const versionStyle: StyleProp<ViewStyle> = {
    marginBottom: safeAreaInsets.bottom > 0 ? 0 : Theme.spacing.spacingL
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Spacer />

        {user && (
          <>
            <HorizontalProfileCard
              user={user}
              onPress={() => navigation.navigate('Profile')}
            />
            <Spacer />
          </>
        )}
        
        <SettingsSections
          sections={sections}
          onItemPressed={async (id: string) => {
            switch (id) {
              case 'privacy_policy':
                WebBrowser.openBrowserAsync('https://www.privacypolicies.com/live/f86ecf9b-78fb-4759-a075-8d6e2319f10b');
                break;

              case 'terms_of_service':
                WebBrowser.openBrowserAsync('https://www.privacypolicies.com/live/1067a25b-a409-4b4f-b93a-e8862aa15ff7');
                break;

              case 'logout':
                await getAuth().signOut();
                await state.logout();
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}]
                });
                break;

              case 'clear_cache':
                await getAuth().signOut();
                await state.clearCache();
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Onboarding'}]
                });
                break;
            }
          }}
        />
      </ScrollView>
      <View style={[styles.versionContainer, versionStyle]}>
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
    alignSelf: 'center'
  },
  versionText: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.normal,
    color: Theme.colors.gray
  }
});

export default Settings;
