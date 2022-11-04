import Button from 'components/buttons/Button';
import IconTextInput from 'components/inputs/IconTextInput';
import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Lock, Mail, User} from 'react-native-feather';
import {Theme} from 'styles/Index';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Register = (): JSX.Element => {
  const navigation = useNavigation();
  
  const [displayName, setDisplayName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

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
            placeholder="Name"
            onChangeText={(text: string) => setDisplayName(text)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <IconTextInput
            autoCapitalize="none"
            autoCorrect={false}
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
            onChangeText={(text: string) => setEmail(text.trim())}
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
            onChangeText={(text: string) => setPassword(text)}
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
        <Button
          text="Create account"
          onPress={createAccount}
          disabled={!validateEmail(email) || !validatePassword(password)}
        />
      </View>
    </View>
  );

  function validateEmail(email?: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email == null ? false : emailRegex.test(email ?? '');
  }

  function validatePassword(password?: string): boolean {
    return (password?.length ?? 0) > 5;
  }

  function validateName(name: string): boolean {
    return name.length > 2;
  }

  async function createAccount() {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email!, password!)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        updateProfile(user, {
          displayName: displayName,
        }).then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }]
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }
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
    marginBottom: Theme.spacing.spacingM
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
