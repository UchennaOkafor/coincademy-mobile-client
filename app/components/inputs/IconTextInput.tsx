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
  icon: JSX.Element;
}

const IconTextInput = (props: Props): JSX.Element => {
  return (
    <View style={styles.searchSection}>
      {props.icon}
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Theme.radius.large,
    borderColor: Theme.colors.borderGray,
    borderWidth: 1,
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
    paddingHorizontal: Theme.spacing.spacingM
  }
});

export default IconTextInput;
