import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Theme } from 'styles/Index';

interface Props {

}

const Spacer = (props: Props): JSX.Element => {
  return (
    <View style={{ marginVertical: 10}} />
  );
};

const styles = StyleSheet.create({
  container: {

  }
});

export default Spacer;
