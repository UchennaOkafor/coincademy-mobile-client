import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Theme} from 'styles/Index';

const ForgotPassword = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.tip}>
        Tip:{' '}
        <Text style={styles.tipMessage}>
          If you forgot your password just remember it 🧠.
        </Text>
      </Text>
      <Image
        resizeMode="contain"
        source={{
          uri: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/08/1519230368-giphy-7.gif'
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Theme.spacing.spacing2XS,
    paddingHorizontal: Theme.spacing.spacingL
  },
  tip: {
    ...Theme.typography.text.h5,
    ...Theme.typography.weight.semiBold,
    marginBottom: Theme.spacing.spacingS,
    textAlign: 'left'
  },
  tipMessage: {
    ...Theme.typography.text.h5,
    ...Theme.typography.weight.light,
    textAlign: 'left'
  },
  image: {
    height: 200
  }
});

export default ForgotPassword;
