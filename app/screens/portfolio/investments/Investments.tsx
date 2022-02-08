import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Theme } from 'styles/Index';

const Investments = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <ActivityIndicator
        color={Theme.colors.purple}
        size="small"
        style={{marginTop: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Investments;
