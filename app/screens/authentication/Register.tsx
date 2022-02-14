import PrimaryButton from 'components/buttons/PrimaryButton';
import IconTextInput from 'components/inputs/IconTextInput';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Lock, Mail, User} from 'react-native-feather';
import {Theme} from 'styles/Index';

const Register = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.registerTitle}>
          Please fill in the form below to continue
        </Text>
        <View style={styles.textInputContainer}>
          <IconTextInput
            autoCapitalize="none"
            keyboardType="default"
            icon={
              <User
                stroke="gray"
                fill={Theme.colors.transparent}
                width={21}
                height={21}
              />
            }
            placeholder="Fullname"
          />
        </View>

        <View style={styles.textInputContainer}>
          <IconTextInput
            autoCapitalize="none"
            keyboardType="email-address"
            icon={
              <Mail
                stroke="gray"
                fill={Theme.colors.transparent}
                width={21}
                height={21}
              />
            }
            placeholder="Email"
          />
        </View>

        <View style={styles.textInputContainer}>
          <IconTextInput
            autoCapitalize="none"
            keyboardType="default"
            secureTextEntry={true}
            icon={
              <Lock
                stroke="gray"
                fill={Theme.colors.transparent}
                width={21}
                height={21}
              />
            }
            placeholder="Password"
          />
        </View>

        <Text style={styles.legalText}>
          By signing up you agree to our
          <Text style={styles.legalTextLink}> Terms & Conditions </Text>
          and
          <Text style={styles.legalTextLink}> Privacy Policy </Text>
        </Text>
      </View>

      <View style={styles.registerButtonContainer}>
        <PrimaryButton
          title="Create account"
          onPress={() => {}}
          squircle={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.spacingM,
    backgroundColor: Theme.colors.backgroundGray,
    justifyContent: 'space-between'
  },
  textInputContainer: {
    marginBottom: Theme.spacing.spacingL
  },
  registerTitle: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
    marginTop: Theme.spacing.spacingXS,
    marginBottom: Theme.spacing.spacingXL,
    textAlign: 'left'
  },
  registerButtonContainer: {
    marginBottom: Theme.spacing.spacing2XL
  },
  legalText: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.normal,
    paddingHorizontal: Theme.spacing.spacing2XS,
    marginTop: Theme.spacing.spacingM,
    lineHeight: 20,
    color: Theme.colors.grayDark,
    textAlign: 'left'
  },
  legalTextLink: {
    ...Theme.typography.weight.medium,
    color: Theme.colors.purple
  }
});

export default Register;
