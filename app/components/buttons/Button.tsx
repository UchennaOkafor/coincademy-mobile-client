import TouchableSurface from 'components/TouchableSurface';
import React, { ReactElement } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp
} from 'react-native';
import { ButtonThemeSize, ButtonThemeStyle } from 'styles/Buttons';
import {Theme} from 'styles/Index';
import MaskedSquircleView from '../MaskedSquircleView';

interface Props {
  text: string;
  onPress: () => void;
  loading?: boolean;
  squircle?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  theme: ButtonThemeStyle;
  size?: 'small' | 'medium';
  style?: StyleProp<ViewStyle>;
}

const Button = (props: Props): JSX.Element => {
  const textColor = props.disabled === true ? props.theme.text.disabled : props.theme.text.enabled;
  const bgColor = props.disabled === true ? props.theme.background.disabled : props.theme.background.enabled;
  const border = props.disabled === true ? props.theme.border?.disabled : props.theme.border?.enabled;
  const size = getButtonSizeStyles(props.size);

  const bgStyle: StyleProp<ViewStyle> = {
    backgroundColor: bgColor,
    borderColor: border,
    paddingHorizontal: size.paddingHorizontal,
    paddingVertical: size.paddingVertical
  };

  const Container = props.squircle === true && Platform.OS === 'ios' ? MaskedSquircleView : View;

  return (
    <Container style={[styles.buttonContainer, props.style]}>
      <TouchableSurface disabled={props.disabled ?? false} onPress={onPress}>
        <View style={[styles.innerButtonContainer, bgStyle]}>
          {props.loading === true ? (
            <ActivityIndicator color={Theme.colors.white} />
          ) : (
            <>
              {props.leadingIcon}
                <Text style={[size.font, {color: textColor}]}>
                {props.text}
              </Text>
              {props.trailingIcon}
            </>
          )}
        </View>
      </TouchableSurface>
    </Container>
  );

  function onPress(): void {
    if (!props.loading) {
      props.onPress();
    }
  }
};

const getButtonSizeStyles = (size?: string): ButtonThemeSize => {
  if (size === 'small') {
    return Theme.buttons.sizes.small;
  } else {
    return Theme.buttons.sizes.medium;
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Theme.radius.large + Theme.radius.extraSmall
  },
  innerButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default Button;