import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { Theme } from 'styles/Index';

interface Props {
  title: string;
}

const Header = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.iconsContainer}>
        {/* <TouchableOpacity>
          <Search
            stroke={Theme.colors.black}
            fill={Theme.colors.transparent}
            width={24}
            height={24}
          />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.secondIconContainer}>
          <Image
            source={{uri: 'https://styles.redditmedia.com/t5_2th52/styles/communityIcon_wzrl8s0hx8a81.png'}} 
            style={{ width: 32, height: 32, borderRadius: 32 / 2 }} 
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
    marginLeft: 20,
    marginRight: 4,
  },
});

export default Header;
