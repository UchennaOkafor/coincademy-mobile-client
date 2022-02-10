import {useNavigation} from '@react-navigation/native';
import GradientButton from 'components/buttons/GradientButton';
import IconTextInput from 'components/inputs/IconTextInput';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Lock, Mail, User } from 'react-native-feather';
import { Theme } from 'styles/Index';

const Register = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.registerTitle}>Please fill in the form below to continue</Text>

        <View style={styles.textInputContainer}>
          <IconTextInput
            autoCapitalize='none'
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
            autoCapitalize='none'
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
            autoCapitalize='none'
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

        <Text style={{ paddingHorizontal: 5, marginTop: 15, ...Theme.typography.text.h7, lineHeight: 20, ...Theme.typography.weight.normal, color: Theme.colors.grayDark, }}>
          By signing up you agree to our 
          <Text style={{ color: Theme.colors.purple, ...Theme.typography.weight.medium }}> Terms & Conditions </Text>
          and
          <Text style={{ color: Theme.colors.purple, ...Theme.typography.weight.medium }}> Privacy Policy </Text>
        </Text>
      </View>


      <View style={{ marginBottom: 25}}>
        <GradientButton
          title='Create account'
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
    marginBottom: Theme.spacing.spacingL,
  },
  registerTitle: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
    marginTop: Theme.spacing.spacingXS,
    marginBottom: Theme.spacing.spacingXL,
  },
});

export default Register;
