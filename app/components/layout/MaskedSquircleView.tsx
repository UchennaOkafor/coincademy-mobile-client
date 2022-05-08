import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SquircleView} from 'react-native-figma-squircle';
import {Theme} from 'styles/Index';

interface Props {
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const MaskedSquircleView = (props: Props): JSX.Element => {
  return (
    <MaskedView
      style={props.style}
      maskElement={
        <SquircleView
          style={StyleSheet.absoluteFill}
          squircleParams={{
            cornerRadius: Theme.radius.large,
            cornerSmoothing: 1
          }}
        />
      }>
      {props.children}
    </MaskedView>
  );
};

export default MaskedSquircleView;
