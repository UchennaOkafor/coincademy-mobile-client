import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Button from '@components/buttons/Button';
import IconTextInput from 'components/inputs/IconTextInput';
import {Lock, Mail} from 'react-native-feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Theme} from 'styles/Index';
import {useUserStore} from 'state/useUserStore';
import GradientText from 'components/texts/GradientText';
import ForgotPassword from 'components/authentication/ForgotPassword';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = (): JSX.Element => {
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
                <GradientText style={styles.logoText}>Coincademy</GradientText>
              </View>
              <Text style={styles.loginText}>Login</Text>
              <Text style={styles.loginSubText}>
                Please sign in to continue
              </Text>

              <View style={styles.textInputContainer}>
                <IconTextInput
                  autoCorrect={false}
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
                  placeholder="Email Address"
                  onChangeText={(text: string) => setEmail(text.trim())}
                />
              </View>

              <View style={styles.textInputContainer}>
                <IconTextInput
                  autoCapitalize="none"
                  icon={
                    <Lock
                      stroke="gray"
                      fill={Theme.colors.transparent}
                      width={21}
                      height={21}
                    />
                  }
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={(text: string) => setPassword(text)}
                />
              </View>

              {(!authenticating && errorMessage) && (
                <Text style={styles.errorMessage}>
                  {errorMessage}
                </Text>
              )}

              <Button
                squircle={true}
                text="Login"
                loading={authenticating}
                onPress={login}
                theme={Theme.buttons.primary}
              />

              <TouchableOpacity
                onPress={handlePresentModalPress}
                style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>

              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                backdropComponent={(backdropProps) => (
                  <BottomSheetBackdrop
                    {...backdropProps}
                    disappearsOnIndex={-1}
                    enableTouchThrough={true}
                  />
                )}
                onChange={handleSheetChanges}>
                <ForgotPassword />
              </BottomSheetModal>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.registerTouchable}>
              <Text style={styles.signupPrefixText}>
                Don't have an account?
                <Text style={styles.signupText}> Register!</Text>
              </Text>
            </TouchableOpacity>
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
    ...Theme.typography.text.h2,
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

export default Login;
