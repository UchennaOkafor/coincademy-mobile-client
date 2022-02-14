import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PrimaryButton from '@components/buttons/PrimaryButton';
import IconTextInput from 'components/inputs/IconTextInput';
import {Lock, Mail} from 'react-native-feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Theme} from 'styles/Index';
import {useUserStore} from 'state/useUserStore';
import GradientText from 'components/texts/GradientText';
import ForgotPassword from 'components/authentication/ForgotPassword';

const Login = (): JSX.Element => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['42%', '55%'], []);
  const [authenticating, setAuthenticating] = useState(false);
  const userStore = useUserStore();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    //console.log('HandleSheetChanges', index);
  }, []);

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

              <View style={styles.textInputContainer}>
                <IconTextInput
                  value="test@test.com"
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
                />
              </View>

              <View style={styles.textInputContainer}>
                <IconTextInput
                  value="password"
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
                />
              </View>

              <PrimaryButton
                squircle={true}
                title="Login"
                loading={authenticating}
                onPress={() => {
                  setAuthenticating(true);
                  setTimeout(() => {
                    userStore.setAuthenticated(true);
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Tabs'}]
                    });
                  }, 1000);
                }}
                style={styles.loginButton}
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
  loginButton: {
    marginVertical: Theme.spacing.spacing3XS
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
    bottom: Theme.spacing.spacingM
  }
});

export default Login;
