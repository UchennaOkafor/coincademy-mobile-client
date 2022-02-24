import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Lesson} from 'codegen/models/Lesson';
import PrimaryButton from 'components/buttons/PrimaryButton';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import {Theme} from 'styles/Index';
import {Audio} from 'expo-av';
import {useUserStore} from 'state/useUserStore';
import LottieView from 'components/lottie/LottieView';

interface LessonRouteProps {
  lesson: Lesson;
}

const LessonOverview = (): JSX.Element => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
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
    };
  }, []);

  const buttonPadding: StyleProp<ViewStyle> = {
    paddingBottom: safeAreaInsets.bottom > 0
      ? Theme.spacing.spacingS + safeAreaInsets.bottom
      : Theme.spacing.spacing2XL
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.contentContainer}>
          <LottieView
            source={require('@assets/animations/checkmark-explode.json')}
            loop={false}
            autoPlay
            speed={0.8}
            resizeMode="center"
            style={[styles.animation, {width: viewportWidth}]}
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>You have completed your lesson</Text>
            <Text style={styles.subtitle}>Keep up the good work!</Text>
          </View>
        </View>
        <View style={[styles.buttonContainer, buttonPadding]}>
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
    const {sound: ding} = await Audio.Sound.createAsync(
      require('@assets/sounds/positive_ding.mp3'),
      {shouldPlay: true, isMuted: soundMuted}
    );

    setSound(ding);
    await ding.playAsync();
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundGray
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  animation: {
    aspectRatio: 200 / 100,
    transform: [{scale: 1.35}]
  },
  textContainer: {
    padding: Theme.spacing.spacingM
  },
  title: {
    ...Theme.typography.text.h3,
    ...Theme.typography.weight.semiBold,
    marginTop: -Theme.spacing.spacingXL,
    marginBottom: Theme.spacing.spacingS,
    textAlign: 'center'
  },
  subtitle: {
    ...Theme.typography.text.h4,
    ...Theme.typography.weight.medium,
    color: Theme.colors.grayDark,
    textAlign: 'center'
  },
  buttonContainer: {
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.spacingM,
    paddingTop: Theme.spacing.spacingXL
  }
});

export default LessonOverview;
