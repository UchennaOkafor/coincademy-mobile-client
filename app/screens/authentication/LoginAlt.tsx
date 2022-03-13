import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Theme} from 'styles/Index';
import {useUserStore} from 'state/useUserStore';
import GradientText from 'components/texts/GradientText';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Spacer from 'components/common/Spacer';
import Button from 'components/buttons/Button';

const LoginAlt = (): JSX.Element => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['42%', '55%'], []);
  const [authenticating, setAuthenticating] = useState(false);
  const userStore = useUserStore();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
  }, []);

  useEffect(() => {
    const authSubscription = getAuth().onAuthStateChanged((user) => {
      if (user) {
        userStore.setAuthenticated(true);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Tabs' }]
        });
      }
    });

    return () => {
      authSubscription();
    }
  });

  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <View style={styles.loginContainer}>
            <View style={styles.innerLoginContainer}>
              <View style={styles.logoContainer}>
                <Image
                  resizeMode="contain"
                  source={require('@assets/images/app/icon.png')}
                  style={styles.logoIcon}
                />
                <GradientText style={styles.logoText}>Eko</GradientText>
              </View>
              <Text style={styles.loginText}>Login</Text>
              <Text style={styles.loginSubText}>
                Please sign in to continue
              </Text>

              <Button
                squircle={true}
                text="Sign in with Apple"
                loading={authenticating}
                leadingIcon={
                  <Image source={{ uri: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/apple-256.png' }} style={{ tintColor: 'white', width: 20, height: 20, marginRight: 10}} />
                }
                onPress={login}
                theme={Theme.buttons.black}
              />

              <Spacer />

              <Button
                squircle={true}
                text="Sign in with Google"
                loading={authenticating}
                leadingIcon={
                  <Image source={{ uri: 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-256.png' }} style={{ width: 20, height: 20, marginRight: 10 }} />
                }
                onPress={login}
                theme={Theme.buttons.white}
              />

              <Spacer />
              
              {(!authenticating && errorMessage) && (
                <Text style={styles.errorMessage}>
                  {errorMessage}
                </Text>
              )}
            </View>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );

  async function login() {
    if (!email && !password) {
      setErrorMessage('Email or password cannot be left empty');
      return;
    }

    setAuthenticating(true);
    signInWithEmailAndPassword(getAuth(), email?.trim()!, password!)
      .then((userCredential) => {
        setErrorMessage('');
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setAuthenticating(false);
        setErrorMessage('Your email or password is incorrect');
      });
  }
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: Theme.spacing.spacingM,
    backgroundColor: Theme.colors.backgroundGray
  },
  loginContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  innerLoginContainer: {
    marginBottom: Theme.spacing.spacing3XL * 2
  },
  logoContainer: {
    marginBottom: Theme.spacing.spacing3XL * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    ...Theme.typography.text.h3,
    marginLeft: Theme.spacing.spacingXS
  },
  logoIcon: {
    width: 40,
    height: 40,
    alignSelf: 'center'
  },
  loginText: {
    ...Theme.typography.text.h2,
    ...Theme.typography.weight.semiBold,
    marginBottom: Theme.spacing.spacingXS,
    textAlign: 'left'
  },
  loginSubText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
    marginBottom: Theme.spacing.spacingXL,
    textAlign: 'left'
  },
  textInputContainer: {
    marginBottom: Theme.spacing.spacingL
  },
  textInput: {
    ...Theme.typography.text.h5,
    ...Theme.typography.weight.normal,
    borderRadius: Theme.radius.extraSmall + Theme.radius.small,
    borderWidth: 1.5,
    paddingVertical: Theme.spacing.spacingS,
    paddingHorizontal: Theme.spacing.spacingM
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
    marginBottom: Theme.spacing.spacingM
  },
  forgotPasswordText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
    color: Theme.colors.purple
  },
  signupPrefixText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal
  },
  signupText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.bold,
    color: Theme.colors.purple
  },
  registerTouchable: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: Theme.spacing.spacingXL
  },
  errorMessage: {
    ...Theme.typography.text.h7, 
    ...Theme.typography.weight.medium, 
    color: Theme.colors.red,
    alignSelf: 'center',
    marginBottom: Theme.spacing.spacingS, 
  }
});

export default LoginAlt;
