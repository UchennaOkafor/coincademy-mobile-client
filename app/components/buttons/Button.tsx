import TouchableSurface from 'components/layout/TouchableSurface';
import React, { ReactElement } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp
} from 'react-native';
import { ButtonThemeSize, ButtonThemeStyle } from 'styles/Buttons';
import {Theme} from 'styles/Index';

interface Props {
  text: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactElement;
  trailingIcon?: ReactElement;
  theme?: ButtonThemeStyle;
  size?: 'small' | 'medium';
  style?: StyleProp<ViewStyle>;
}

const Button = (props: Props): JSX.Element => {
  const theme = props.theme ?? Theme.buttons.styles.primary;
  const textColor = props.disabled === true ? theme.text.disabled : theme.text.enabled;
  const bgColor = props.disabled === true ? theme.background.disabled : theme.background.enabled;
  const border = props.disabled === true ? theme.border?.disabled : theme.border?.enabled;
  const size = getButtonSizeStyles(props.size);

  const bgStyle: StyleProp<ViewStyle> = {
    backgroundColor: bgColor,
    paddingHorizontal: size.paddingHorizontal,
    paddingVertical: size.paddingVertical,
    
    borderColor: border == null ? undefined : border,
    borderWidth: border == null ? undefined : 2,
  };

  return (
    <TouchableSurface 
      style={[styles.container, bgStyle, props.style]} 
      disabled={props.disabled ?? false} 
      onPress={onPress}>
      {props.loading === true ? (
        <ActivityIndicator color={Theme.colors.white} />
      ) : (
        <>
          {props.leadingIcon}
          <Text style={[size.font, { color: textColor }]}>
            {props.text}
          </Text>
          {props.trailingIcon}
        </>
      )}
    </TouchableSurface>
  );

  function onPress(): void {
    if (!props.loading) {
      props.onPress?.();
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
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: Theme.radius.large
  }
});

export default Button;