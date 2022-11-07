import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {LinearGradient, LinearGradientPoint} from 'expo-linear-gradient';
import {Theme} from 'styles/Index';

interface Props extends TextProps {
  colors: string[];
  locations?: number[] | null;
  start?: LinearGradientPoint | null;
  end?: LinearGradientPoint | null;
}

const GradientText = (props: Props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[Theme.colors.purple, Theme.colors.orange]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, styles.text]} />
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    opacity: 0
  }
});

export default GradientText;
