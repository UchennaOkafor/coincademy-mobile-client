import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Theme} from 'styles/Index';
import ProfileCard from 'components/profile/ProfileCard';
import { getAuth } from 'firebase/auth';
import BaseLayout from 'components/layout/BaseLayout';

const Profile = (): JSX.Element => {
  const user = getAuth().currentUser;

  return (
    <BaseLayout style={styles.container}>
      <ProfileCard user={user} />
      <LinearGradient
        style={styles.profileDivider}
        colors={[Theme.colors.orange, Theme.colors.blue]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />
      <View style={styles.emptyContainer}>
        <Image
          resizeMode="contain"
          style={styles.emptyImage}
          source={require('@assets/images/zen.png')}
        />
        <Text style={styles.emptyText}>Profile coming soon...</Text>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Theme.radius.extraSmall,
    borderStyle: 'dashed',
    borderWidth: 1.8,
    borderColor: Theme.colors.backgroundGrayDark,
    marginVertical: Theme.spacing.spacingL
  },
  profileDivider: {
    width: '100%',
    height: 3,
    borderRadius: Theme.radius.extraSmall
  },
  emptyImage: {
    width: '100%',
    height: 90,
    marginBottom: Theme.spacing.spacing2XL
  },
  emptyText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
    color: Theme.colors.gray
  }
});

export default Profile;
