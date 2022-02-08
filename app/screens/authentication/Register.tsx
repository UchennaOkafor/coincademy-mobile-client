import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { Theme } from 'styles/Index';

const Register = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Step 1/5</Text>
      <Text>
        Let's get you started
      </Text>

      <Text>
        What is your difficulty level?
      </Text>

      <View>
        <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/family-member-flat-happy-family-day/512/Son-512.png'}} style={{width: 75, height: 75}} />
        <Text>Beginner</Text>
        <Text>If you've never</Text>
      </View>

      <View>
        <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/family-member-flat-happy-family-day/512/Son-512.png'}} style={{width: 75, height: 75}} />
        <Text>Intermediate</Text>
        <Text>You kind of know it but not properly</Text>
      </View>

      <View>
        <Image source={{ uri: 'https://cdn3.iconfinder.com/data/icons/family-member-flat-happy-family-day/512/Son-512.png'}} style={{width: 75, height: 75}} />
        <Text>Expert</Text>
        <Text>If you're a seasoned professional</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.spacingM,
    backgroundColor: Theme.colors.backgroundGray,
  }
});

export default Register;
