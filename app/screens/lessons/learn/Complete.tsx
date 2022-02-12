import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { Lesson } from 'codegen/models/Lesson';
import PrimaryButton from 'components/buttons/PrimaryButton';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import LottieView from 'lottie-react-native';
import { Theme } from 'styles/Index';
import { Audio } from 'expo-av';
import { useUserStore } from 'state/useUserStore';

interface LessonRouteProps {
  lesson: Lesson;
}

const LessonOverview = (): JSX.Element => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<{params: LessonRouteProps}, 'params'>>();
  const confettiCannon = useRef<ConfettiCannon>(null);
  const {width: viewportWidth} = Dimensions.get('window');
  const [sound, setSound] = React.useState<Audio.Sound>();
  const userStore = useUserStore();
  const [soundMuted] = useState(userStore.preferences.sound.muted);

  useEffect(() => {
    confettiCannon.current?.start();
    playDingSound();

    return () => {
      sound?.unloadAsync();
    }
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 130  }}>
          <LottieView 
            source={require('@assets/animations/checkmark-explode.json')}
            loop={false}
            autoPlay
            speed={0.8}
            resizeMode="center"
            style={{ width: viewportWidth, aspectRatio: 200 / 100, transform: [{ scale: 1.4 }] }}
          />
          
          <View style={{ padding: Theme.spacing.spacingM }}>
            <Text style={{ ...Theme.typography.text.h3, textAlign: 'center', marginTop: -25, marginBottom: 14 }}>You have completed your lesson</Text>
            <Text style={{ ...Theme.typography.text.h4, ...Theme.typography.weight.medium, textAlign: 'center', color: Theme.colors.grayDark }}>Keep up the good work!</Text>
          </View>
        </View>
        <View style={{ backgroundColor: Theme.colors.white, paddingTop: 25, paddingBottom: 25 + insets.bottom, paddingHorizontal: Theme.spacing.spacingM, }}>
          <PrimaryButton
            squircle={true}
            title="Complete"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
      </View>
      {/* <ConfettiCannon
        ref={confettiCannon} 
        count={Platform.OS === 'android' ? 80 : 120} 
        origin={{x: -15, y: -15}} 
        fadeOut={true}
        autoStart={false}
        fallSpeed={1500}
        explosionSpeed={500}
      /> */}
    </SafeAreaView>
  );


  async function playDingSound() {
		const { sound: ding } = await Audio.Sound.createAsync(
			require('@assets/sounds/positive_ding.mp3'),
      { shouldPlay: true, isMuted: soundMuted }
		);

		setSound(ding);
		await ding.playAsync();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundGray,
  },
});

export default LessonOverview;
