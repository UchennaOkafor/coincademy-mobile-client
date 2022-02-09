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
import { LogOut } from 'react-native-feather';

const Settings = (): JSX.Element => {
  const navigation = useNavigation();
  const state = useUserStore();

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.spacingM,
    backgroundColor: Theme.colors.backgroundGray
  },
});

export default Settings;