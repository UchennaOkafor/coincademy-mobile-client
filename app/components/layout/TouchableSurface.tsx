import React, {ReactElement} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ViewStyle
} from 'react-native';

interface Props {
  disabled?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
  androidDelayPressIn?: number | undefined;
  style?: StyleProp<ViewStyle>;
}

const TouchableSurface = (props: Props): ReactElement => {
  const borderRadius = StyleSheet.flatten(props.style)?.borderRadius;

  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback
      delayPressIn={props.androidDelayPressIn}
      disabled={props.disabled}
      background={TouchableNativeFeedback.Ripple('#AAF', false)}
      useForeground={true}
      onPress={props.onPress}>
      <View style={[styles.container, props.style]}>
        {props.children}
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableHighlight
      disabled={props.disabled}
      style={[{ borderRadius }, styles.container]}
      onPress={props.onPress}>
      <View style={[styles.container, props.style]}>
        {props.children}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    overflow: 'hidden'
  }
});

export default TouchableSurface;
