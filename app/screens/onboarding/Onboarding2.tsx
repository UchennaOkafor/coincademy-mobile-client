import Spacer from 'components/common/Spacer';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {Theme} from 'styles/Index';
import PagerView from 'react-native-pager-view';
import { StatusBar } from 'expo-status-bar';
import HeaderBackButton from 'components/headers/HeaderBackButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useLocalStore } from 'state/useLocalStore';
import EnterNameStep from './wizard/EnterNameStep';
import SelectInterestStep from './wizard/SelectInterestStep';
import DisclaimerStep from './wizard/DisclaimerStep';
import SelectExperienceStep from './wizard/SelectExperienceStep';
import EmojiItem from 'models/EmojiItem';

interface User {
  name: string;
  interests: EmojiItem[];
  experience: EmojiItem | null;
}

const Onboarding2 = (): JSX.Element => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const localStore = useLocalStore();

  const [pageIndex, setPageIndex] = useState(0);
  const pagerView = useRef<PagerView>(null);

  const [user] = useState<User>({
    name: '',
    interests: [],
    experience: null
  });

  return (
    <View style={styles.container}>
      <StatusBar style='light' translucent={true} />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[Theme.colors.orange, Theme.colors.purple]}
        style={[styles.header, {paddingTop: insets.top + Theme.spacing.spacingXS}]}>
        <HeaderBackButton
          color={Theme.colors.white}
          onPress={() => {
            if (pageIndex === 0) {
              navigation.goBack();
            } else {
              pagerView.current?.setPage(pageIndex - 1);
            }
          }}
        />
      </LinearGradient>
      <Spacer />
      <Text style={styles.stepText}>Step {pageIndex + 1}/4</Text>
      <PagerView 
        initialPage={pageIndex}
        ref={pagerView} 
        scrollEnabled={false} 
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        style={styles.pagerView}>
        <View key={1}>
          <EnterNameStep
            onNext={(displayName: string) => {
              pagerView.current?.setPage(1);
              user.name = displayName;
            }}
          />
        </View>
        <View key={2}>
          <SelectInterestStep
            onNext={(interests: EmojiItem[]) => {
              pagerView.current?.setPage(2);
              user.interests = interests;
            }} 
          />
        </View>
        <View key={3}>
          <SelectExperienceStep
            onNext={(experience: EmojiItem) => {
              pagerView.current?.setPage(3);
              user.experience = experience;
            }}
          />
        </View>
        <View key={4}>
          <DisclaimerStep
            onNext={async () => {
              localStore.setOnboardingValues({
                name: user.name,
                experience: user.experience!.id,
                interests: user.interests.map(e => e.id),
                onboarded: true,
                createdAt: Date.now()
              });

              navigation.navigate('Login');
            }}
          />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Theme.colors.backgroundGray,
  },
  stepText: {
    ...Theme.typography.text.h6,
    color: Theme.colors.gray, 
    paddingHorizontal: Theme.spacing.spacingM, 
    marginBottom: Theme.spacing.spacingS
  },
  pagerView: {
    flexGrow: 1
  },
  header: {
    paddingHorizontal: Theme.spacing.spacingS,
    paddingBottom: Theme.spacing.spacingS
  }
});

export default Onboarding2;
