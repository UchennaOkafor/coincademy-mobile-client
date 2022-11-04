import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import {Theme} from 'styles/Index';
import { useLocalStore } from 'state/useLocalStore';
import Spacer from 'components/common/Spacer';
import Constants from 'expo-constants';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import SettingsSections from 'components/settings/SettingsSections';
import SettingsListData from 'resources/SettingsListData';
import { getAuth } from 'firebase/auth';
import HorizontalProfileCard from 'components/profile/HorizontalProfileCard';
import * as MailComposer from 'expo-mail-composer';

const Settings = (): JSX.Element => {
  const navigation = useNavigation();
  const localStore = useLocalStore();
  const sections = SettingsListData.getSettingsSections();
  const safeAreaInsets = useSafeAreaInsets();

  const versionStyle: StyleProp<ViewStyle> = {
    marginBottom: safeAreaInsets.bottom > 0 ? 0 : Theme.spacing.spacingL
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Spacer />

        <HorizontalProfileCard
          displayName={localStore.user.name}
          onPress={() => navigation.navigate('Profile')}
        />
        <Spacer />
        
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
                localStore.reset();
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}]
                });
                break;

              case 'clear_cache':
                await getAuth().signOut();
                localStore.reset();
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Welcome'}]
                });
                break;

              case 'feedback':
                await MailComposer.composeAsync({
                  recipients: ['okaforu335@gmail.com'],
                  subject: 'I have feedback'
                });
                break;

              case 'contactUs':
                await MailComposer.composeAsync({
                  recipients: ['okaforu335@gmail.com'],
                  subject: 'Support'
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
