import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
	Text
} from 'react-native';
import { Theme } from 'styles/Index';
import { useUserStore } from 'state/useUserStore';
import { LogOut, Trash2 } from 'react-native-feather';
import TitleSectionHeader from 'components/headers/TitleSectionHeader';
import Divider from 'components/common/Divider';
import Spacer from 'components/common/Spacer';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = (): JSX.Element => {
  const navigation = useNavigation();
  const state = useUserStore();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Divider />
        <TitleSectionHeader title='Login' />
        <TouchableOpacity 
          style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center'}} 
          onPress={async () => {
            await state.logout();
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}]
            });
          }}
        >
          <LogOut
            stroke={Theme.colors.red}
            width={22}
            height={22}
            style={{ marginRight: 15}}
          />
          <Text style={{...Theme.typography.text.h5, ...Theme.typography.weight.medium, color: Theme.colors.red }}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ marginTop: 18, flexDirection: 'row', alignItems: 'center'}} 
          onPress={async () => {
            await state.clearCache();
            navigation.reset({
              index: 0,
              routes: [{name: 'Onboarding'}]
            });
          }}
        >
          <Trash2
            stroke={Theme.colors.gray}
            width={22}
            height={22}
            style={{ marginRight: 15}}
          />
          <Text style={{...Theme.typography.text.h5, ...Theme.typography.weight.medium, color: Theme.colors.gray }}>Clear Cache</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf: 'center'}}>
        <Text style={{ ...Theme.typography.text.h6, ...Theme.typography.weight.medium, color: Theme.colors.gray}}>v{Constants.manifest?.version}</Text>
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