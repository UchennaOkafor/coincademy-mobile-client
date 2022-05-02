import React, {ReactElement} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native';

interface Props {
  disabled?: boolean;
  children: ReactElement;
  onPress: () => void;
  androidDelayPressIn?: number | undefined;
}

const TouchableSurface = (props: Props): ReactElement => {
  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback
      delayPressIn={props.androidDelayPressIn}
      disabled={props.disabled}
      onPress={props.onPress}>
      {props.children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableHighlight
      disabled={props.disabled}
      style={styles.touchableHighlight}
      onPress={props.onPress}>
      {props.children}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchableHighlight: {
    flexGrow: 1
  }
});

export default TouchableSurface;
