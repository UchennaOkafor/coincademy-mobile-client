import {useNavigation} from '@react-navigation/native';
import GradientButton from 'components/buttons/GradientButton';
import IconTextInput from 'components/inputs/IconTextInput';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { Mail, User } from 'react-native-feather';
import { Theme } from 'styles/Index';

const Register = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text>Step 1/5</Text>
        <Text>
          Let's get you started
        </Text>

        <Text>
          What is your difficulty level?
        </Text>

        <View>
          <Text>Beginner</Text>
          <Text>If you've never</Text>
        </View>

        <View>
          <Text>Intermediate</Text>
          <Text>You kind of know it but not properly</Text>
        </View>

        <View>
          <Text>Expert</Text>
          <Text>If you're a seasoned professional</Text>
        </View>

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
      </View>


      <View style={{ marginBottom: 25}}>
        <GradientButton
          title='Create account'
          onPress={() => {}}
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
});

export default Register;
