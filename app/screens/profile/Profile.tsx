import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Theme} from 'styles/Index';
import ProfileCard from 'components/profile/ProfileCard';
import { getAuth } from 'firebase/auth';
import BaseLayout from 'components/layout/BaseLayout';
import Pill from 'components/cards/Pill';
import { useLocalStore } from 'state/useLocalStore';
import OnboardingData from 'resources/OnboardingData';

const Profile = (): JSX.Element => {
  const user = getAuth().currentUser;
  const localStore = useLocalStore();

  const experiences = OnboardingData.getExperienceLevels().find(e => e.id == localStore.user.experience);
  const interests = OnboardingData.getInterests().filter(e => localStore.user.interests.includes(e.id));

  return (
    <BaseLayout style={styles.container}>
      <ProfileCard 
        displayName={localStore.user.name} 
        createdAt={localStore.user.createdAt} 
      />
      <LinearGradient
        style={styles.profileDivider}
        colors={[Theme.colors.orange, Theme.colors.blue]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.title}>Interests</Text>
          <View style={styles.sectionContainer}>
            {interests.map((value, index) => (
              <Pill 
                key={value.id} 
                text={`${value?.emoji} ${value?.name}`} 
                style={styles.pillItem} 
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Experience</Text>
          <View style={styles.sectionContainer}>
            <Pill text={`${experiences?.emoji} ${experiences?.name}`} style={styles.pillItem} />
          </View>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginVertical: Theme.spacing.spacingL,
  },
  profileDivider: {
    width: '100%',
    height: 3,
    borderRadius: Theme.radius.extraSmall
  },
  title: {
    ...Theme.typography.text.h5,
    ...Theme.typography.weight.semiBold,
    color: Theme.colors.black,
    marginBottom: Theme.spacing.spacingXS
  },
  section: {
    marginBottom: Theme.spacing.spacing2XL
  },
  sectionContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  pillItem: {
    marginRight: Theme.spacing.spacingXS + Theme.spacing.spacing3XS, 
    marginBottom: Theme.spacing.spacingXS + Theme.spacing.spacing3XS
  }
});

export default Profile;
