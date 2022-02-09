import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PrimaryButton from '@components/buttons/PrimaryButton';
import IconTextInput from 'components/inputs/IconTextInput';
import {Lock, Mail} from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from 'styles/Index';
import { useUserStore } from 'state/useUserStore';

const Login = (): JSX.Element => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['42%', '55%'], []);
  const [loginLoading, setLoginLoading] = useState(false);
  const userStore = useUserStore();

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <SafeAreaView style={{ flexGrow: 1}}>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheetModalProvider>
          <View style={{flexGrow: 1, justifyContent: 'center'}}>
            <View>
              <Text style={styles.loginText}>Login</Text>
              <Text style={styles.loginSubText}>Please sign in to continue</Text>

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
                  placeholder="Email Address"
                />
              </View>

              <View style={styles.textInputContainer}>
                <IconTextInput
                  autoCapitalize='none'
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
                loading={loginLoading}
                onPress={() => {
                  setLoginLoading(true);
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
                backdropComponent={backdropProps => (
                  <BottomSheetBackdrop
                    {...backdropProps}
                    disappearsOnIndex={-1}
                    enableTouchThrough={true}
                  />
                )}
                onChange={handleSheetChanges}>
                <View style={{paddingVertical: 5, paddingHorizontal: 20}}>
                  <Text style={{ ...Theme.typography.text.h4, marginBottom: 10 }}>If you forgot your password just remember it 🧠.</Text>
                  <Image
                    resizeMode="contain"
                    source={{ uri: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/08/1519230368-giphy-7.gif'}}
                    style={{ width: '100%', height: 200 }}
                  />
                </View>
              </BottomSheetModal>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={{position: 'absolute', bottom: 15, alignSelf: 'center'}}>
              <Text style={styles.signupPrefixText}>
                Don't have an account?{' '}
                <Text style={styles.signupText}>Register!</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: Theme.spacing.spacingM,
    backgroundColor: Theme.colors.backgroundGray,
  },
  loginText: {
    ...Theme.typography.text.h2,
    ...Theme.typography.weight.semiBold,
    marginBottom: Theme.spacing.spacingXS,
  },
  loginSubText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
    marginBottom: Theme.spacing.spacingXL,
  },
  textInputContainer: {
    marginBottom: Theme.spacing.spacingL,
  },
  textInput: {
    ...Theme.typography.text.h5,
    ...Theme.typography.weight.normal,
    borderRadius: Theme.radius.extraSmall + Theme.radius.small,
    borderWidth: 1.5,
    paddingVertical: Theme.spacing.spacingS,
    paddingHorizontal: Theme.spacing.spacingM,
  },
  loginButton: {
    marginVertical: Theme.spacing.spacing3XS,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
    marginBottom: Theme.spacing.spacingM,
  },
  forgotPasswordText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
    color: Theme.colors.purple,
  },
  signupPrefixText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
  },
  signupText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.bold,
    color: Theme.colors.purple,
  },
});

export default Login;
