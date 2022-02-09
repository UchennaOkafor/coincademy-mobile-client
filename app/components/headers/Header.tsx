import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { Search, Settings } from 'react-native-feather';
import { Theme } from 'styles/Index';

interface Props {
  title: string;
  onSettingsPress: () => void;
  onProfilePress: () => void;
}

const Header = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.secondIconContainer} onPress={props.onProfilePress}>
          <Image
            source={{uri: 'https://styles.redditmedia.com/t5_2th52/styles/communityIcon_wzrl8s0hx8a81.png'}} 
            style={{ width: 28, height: 28, borderRadius: 28 / 2 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onSettingsPress}>
          <Settings
            stroke={Theme.colors.grayDark}
            fill={Theme.colors.transparent}
            width={22}
            height={22}
            style={{ marginTop: 5}}
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
    marginVertical: Theme.spacing.spacingL,
  },
  title: {
    ...Theme.typography.text.h3,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  secondIconContainer: {
    marginRight: 15,
    marginLeft: 4,
  },
});

export default Header;
