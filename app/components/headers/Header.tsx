import Avatar from 'components/profile/Avatar';
import { User } from 'firebase/auth';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Settings} from 'react-native-feather';
import {Theme} from 'styles/Index';

interface Props {
  title: string;
  user: User | null;
  onSettingsPress: () => void;
  onProfilePress: () => void;
}

const Header = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.iconsContainer}>
        {/* <TouchableOpacity
          style={styles.secondIconContainer}
          onPress={props.onProfilePress}>
          <Avatar user={props.user} size={28}/>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={props.onSettingsPress}>
          <Settings
            stroke={Theme.colors.grayDark}
            fill={Theme.colors.transparent}
            width={21}
            height={21}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...Theme.typography.text.h2,
    ...Theme.typography.weight.extraBold
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: Theme.spacing.spacing3XS
  },
  secondIconContainer: {
    marginRight: Theme.spacing.spacingS,
  },
  settingsIcon: {
    marginTop: Theme.spacing.spacing2XS
  }
});

export default Header;
