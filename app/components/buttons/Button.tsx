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
import { ButtonTheme } from 'styles/Buttons';
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
  theme: ButtonTheme;
}

const Button = (props: Props): JSX.Element => {
  const textColor = props.disabled === true ? props.theme.text.disabled : props.theme.text.enabled;
  const bgColor = props.disabled === true ? props.theme.background.disabled : props.theme.background.enabled;
  const border = props.disabled === true ? props.theme.border?.disabled : props.theme.border?.enabled;

  const bgStyle: StyleProp<ViewStyle> = {
    backgroundColor: bgColor,
    borderColor: border
  };

  const ButtonContainer = props.squircle === true && Platform.OS === 'ios' ? MaskedSquircleView : View;

  return (
    <ButtonContainer style={styles.buttonContainer}>
      <TouchableSurface disabled={props.disabled ?? false} onPress={onPress}>
        <View style={[styles.innerButtonContainer, bgStyle]}>
          {props.loading === true ? (
            <ActivityIndicator color={Theme.colors.white} />
          ) : (
            <>
              {props.leadingIcon}
              <Text style={[styles.text, {color: textColor}]}>
                {props.text}
              </Text>
              {props.leadingIcon}
            </>
          )}
        </View>
      </TouchableSurface>
    </ButtonContainer>
  );

  function onPress(): void {
    if (!props.loading) {
      props.onPress();
    }
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Theme.radius.large + Theme.radius.extraSmall
  },
  innerButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.spacingM,
    paddingVertical: Theme.spacing.spacingS + Theme.spacing.spacing2XS
  },
  text: {
    ...Theme.typography.text.h5
  }
});

export default Button;