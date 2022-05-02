import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Theme} from 'styles/Index';

interface Props {
  color?: string;
}

const Divider = (props: Props): JSX.Element => {
  const borderColor = { 
    borderBottomColor: props.color ?? Theme.colors.backgroundGrayDark 
  };

  return <View style={[styles.divider, borderColor]} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default Divider;
