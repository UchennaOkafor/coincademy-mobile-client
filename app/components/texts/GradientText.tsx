import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {Text, TextProps} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Theme } from 'styles/Index';

const GradientText = (props: TextProps) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[Theme.colors.orange, Theme.colors.purple]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
