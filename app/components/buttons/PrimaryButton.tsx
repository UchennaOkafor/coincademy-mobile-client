import TouchableSurface from 'components/TouchableSurface';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from 'styles/Index';
import MaskedSquircleView from '../MaskedSquircleView';

interface Props {
  title: string;
  onPress: () => void;
  type?: 'default' | 'soft';
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  squircle?: boolean;
  disabled?: boolean;
}

const PrimaryButton = (props: Props): JSX.Element => {
  const textColor = props.disabled === true ? Theme.colors.white :
    props.type === 'default' || props.type === undefined
      ? Theme.colors.white
      : Theme.colors.purple;
  const bgColor = props.disabled === true ? Theme.colors.backgroundGrayDark :
    props.type === 'default' || props.type === undefined
      ? Theme.colors.purple
      : Theme.colors.purpleBorder;

  const ButtonContainer = props.squircle === true && Platform.OS === 'ios' ? MaskedSquircleView : View;

  return (
    <ButtonContainer
      style={[styles.buttonContainer, props.style]}>
      <TouchableSurface disabled={props.disabled ?? false} onPress={onPress}>
        <View style={[styles.innerButtonContainer, {backgroundColor: bgColor}]}>
          {props.loading === true ? (
            <ActivityIndicator color={Theme.colors.white} />
          ) : (
            <Text style={[styles.title, {color: textColor}]}>
              {props.title}
            </Text>
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
    borderRadius: Theme.radius.large + Theme.radius.extraSmall,
  },
  innerButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.spacingM,
    paddingVertical: Theme.spacing.spacingS + Theme.spacing.spacing2XS,
  },
  title: {
    ...Theme.typography.text.h5,
  },
});

export default PrimaryButton;
