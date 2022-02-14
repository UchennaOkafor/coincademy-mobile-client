import MaskedView from '@react-native-masked-view/masked-view';
import React, {ReactElement} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SquircleView} from 'react-native-figma-squircle';
import {Theme} from 'styles/Index';

interface Props {
  style: StyleProp<ViewStyle>;
  children: ReactElement;
}

const MaskedSquircleView = (props: Props): JSX.Element => {
  return (
    <MaskedView
      style={[styles.container, props.style]}
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

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});

export default MaskedSquircleView;
