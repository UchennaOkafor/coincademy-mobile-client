import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Theme } from 'styles/Index';

interface Props {

}

const Divider = (props: Props): JSX.Element => {
  return (
    <View style={styles.divider} />
  );
};

const styles = StyleSheet.create({
  divider: {
		borderWidth: 0.8,
		borderColor: Theme.colors.backgroundGrayDark,
  }
});

export default Divider;
