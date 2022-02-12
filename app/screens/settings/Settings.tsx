import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
	Text,
} from 'react-native';
import { Theme } from 'styles/Index';
import { useUserStore } from 'state/useUserStore';
import { Book, File, LogOut, Trash2 } from 'react-native-feather';
import Divider from 'components/common/Divider';
import Spacer from 'components/common/Spacer';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

const Settings = (): JSX.Element => {
  const navigation = useNavigation();
  const state = useUserStore();

  const loginItems = [{
    title: 'Logout',
    icon: LogOut,
    color: Theme.colors.red,
    onPress: async () => {
      await state.logout();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}]
      });
    }
  }, {
      title: 'Clear cache',
      icon: Trash2,
      color: Theme.colors.gray,
      onPress: async () => {
        await state.clearCache();
        navigation.reset({
          index: 0,
          routes: [{name: 'Onboarding'}]
        });
      }
    }
  ];

  const aboutItems = [{
    title: 'Privacy Policy',
    icon: File,
    color: Theme.colors.grayDark,
    onPress: () => WebBrowser.openBrowserAsync('https://expo.dev')
  }, {
      title: 'Terms of Service',
      icon: Book,
      color: Theme.colors.grayDark,
      onPress: () => WebBrowser.openBrowserAsync('https://expo.dev')
    }
  ];

  const sections = [
    {title: 'About', items: aboutItems},
    {title: 'Device', items: loginItems},
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <Spacer />
        {sections.map((item) => {
          return (
            <View key={item.title}>
              <Text style={{...Theme.typography.text.h6, ...Theme.typography.weight.medium, color: Theme.colors.grayDark900 }}>{item.title.toUpperCase()}</Text>
              <Spacer />
              <Divider />
              {item.items.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.title}
                    style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center'}} 
                    onPress={item.onPress}>
                    <item.icon
                      stroke={item.color}
                      width={22}
                      height={22}
                      style={{ marginRight: 15}}
                    />
                    <Text style={{...Theme.typography.text.h6, ...Theme.typography.weight.normal, color: item.color }}>{item.title}</Text>
                  </TouchableOpacity>
                )
              })}
              <Spacer vertical={Theme.spacing.spacingL} />
            </View>
          )
        })}
      </ScrollView>
      <View style={{ alignSelf: 'center', marginBottom: 20}}>
        <Text style={{ ...Theme.typography.text.h7, ...Theme.typography.weight.normal, color: Theme.colors.gray}}>v{Constants.manifest?.version}</Text>
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
});

export default Settings;