import React from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
  View
} from 'react-native';
import {Theme} from 'styles/Index';

type BaseTextInputProps = Omit<TextInputProps, 'clearButtonMode' | 'style'>;

interface Props extends BaseTextInputProps {
  icon?: JSX.Element;
}

const IconTextInput = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      {props.icon && (
        <View style={{ marginRight: Theme.spacing.spacingM }}>
          {props.icon}
        </View>
      )}
      
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Theme.radius.large,
    borderColor: Theme.colors.borderGray,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.spacingM
  },
  input: {
    flex: 1,
    ...Theme.typography.text.h5,
    ...Theme.typography.weight.normal,
    color: Theme.colors.grayDark,
    paddingVertical: Platform.OS === 'android'
        ? Theme.spacing.spacingXS + Theme.spacing.spacing3XS
        : Theme.spacing.spacingS + Theme.spacing.spacing3XS,
  }
});

export default IconTextInput;
