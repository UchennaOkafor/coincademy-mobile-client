import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import {Volume2, VolumeX, X} from 'react-native-feather';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Carousel} from 'react-native-snap-carousel';
import GenericContent from 'components/lessons/types/GenericContent';
import MultipleChoiceQuestion from 'components/lessons/types/MultipleChoiceQuestion';
import Button from 'components/buttons/Button';
import ProgressBar from 'components/ProgressBar';
import {Lesson} from 'codegen/models/Lesson';
import {BaseLessonItem} from 'codegen/models/BaseLessonItem';
import {ContentItem, MultipleChoiceQuestionItem} from 'codegen';
import {Theme} from 'styles/Index';
import {useUserStore} from 'state/useUserStore';
import {Audio} from 'expo-av';
import ImageContentCard from 'components/common/ImageContentCard';
import AnimatedContentCard from '../../../components/common/AnimatedContentCard';
import ConfirmActionModal from 'components/modals/ConfirmActionModal';
import ContentModal from 'components/modals/ContentModal';
const FeedbackWrong = require('@assets/sounds/feedback_wrong.mp3');
const FeedbackCorrect = require('@assets/sounds/feedback_correct.mp3');

interface LessonRouteProps {
  lesson: Lesson;
}

const LessonOverview = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{params: LessonRouteProps}, 'params'>>();
  const lessonItems: ContentItem[] = route.params.lesson.contents;
  const [loading, setLoading] = useState(true);

  if (lessonItems.length == 0) {
    requestAnimationFrame(() => {
      navigation.setOptions({ headerShown: true, title: route.params.lesson.title });
    });

    return (
      <ImageContentCard
        title="Lesson contents are empty"
        subtitle="This lesson hasn't been setup correctly"
        source={require('@assets/images/ghost.png')}
      />
    )
  }

  const safeAreaInsets = useSafeAreaInsets();
  const {width: viewportWidth} = Dimensions.get('window');

  const userStore = useUserStore();
  const carousel = useRef<Carousel<BaseLessonItem>>(null);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>();
  const [currentLessonItems, setCurrentLessonItems] = useState(lessonItems.slice(0, 1));
  const [currentQuestionMultiChoice, setCurrentQuestionMultiChoice] = useState(false);
  const [revealMultiChoiceAnswer, setRevealMultiChoiceAnswer] = useState(false);

  const [networkSound, setNetworkSound] = useState<Audio.Sound>();
  const [localSound, setLocalSound] = useState<Audio.Sound>();
  const [soundMuted, setSoundMuted] = useState(userStore.preferences.sound.muted);

  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [contentModalVisible, setContentModalVisible] = useState(userStore.preferences.sound.muted);

  const pauseSound = useCallback(async () => {
    await networkSound?.pauseAsync();
    await localSound?.pauseAsync();
  }, [networkSound, localSound]);

  const playSound = useCallback(async () => {
    await networkSound?.playAsync();
    await localSound?.playAsync();
  }, [networkSound, localSound]);

  const disposeSound = useCallback(async () => {
    await networkSound?.unloadAsync();
    await localSound?.unloadAsync();
  }, [networkSound, localSound]);

  useEffect(() => {
    lessonItems.forEach((e) => {
      if (e.imageUrl) {
        Image.prefetch(e.imageUrl);
      }

      if (e.lottieUrl) {
        fetch(e.lottieUrl);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      disposeSound();
    };
  }, [disposeSound]);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1750);

    const initializeAudio = async () => {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
      });
    }

    const beforeRemove = (e: any) => {
      e.preventDefault();
      setExitModalVisible(true);
    }

    initializeAudio();
    navigation.addListener('beforeRemove', beforeRemove);

    return () => {
      navigation.removeListener('beforeRemove', beforeRemove);
      clearTimeout(loadingTimer);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    setHasReachedEnd(carouselIndex === lessonItems.length - 1);
    const isCurrentQuestionMultiChoice = lessonItems[carouselIndex].type === 'MultiChoiceQuestion';
    setCurrentQuestionMultiChoice(isCurrentQuestionMultiChoice);
    if (isCurrentQuestionMultiChoice) {
      setSelectedAnswerId(null);
    }

    playAudioFromUrl(lessonItems[carouselIndex].narrationAudioUrl);
  }, [carouselIndex, loading]);

  useEffect(() => {
    if (loading) {
      return;
    }

    userStore.setSoundMuted(soundMuted);

    if (soundMuted) {
      pauseSound();
    } else {
      playSound();
    }
  }, [soundMuted, loading, pauseSound, playSound]);

  if (loading) {
    return (
      <AnimatedContentCard
        loading={loading}
        source={require('@assets/animations/lazydoge-rocket.json')}
        title="Loading..."
        subtitle="We're just getting things fired up"
      />
    );
  }

  const buttonPadding: StyleProp<ViewStyle> = {
    paddingBottom: safeAreaInsets.bottom > 0
      ? Theme.spacing.spacingS + safeAreaInsets.bottom
      : Theme.spacing.spacing2XL
  };

  const buttonsHitSlop = {
    top: Theme.spacing.spacingM, 
    bottom: Theme.spacing.spacingM, 
    left: Theme.spacing.spacingM + Theme.spacing.spacingXS,
    right: Theme.spacing.spacingM + Theme.spacing.spacingXS
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ConfirmActionModal
        visible={exitModalVisible}
        title="Are you sure?"
        text="All of your progress for this lesson will be lost"
        primaryButton={{
          text: "Leave",
          onClick: () => navigation.navigate('Home')
        }}
        secondaryButton={{
          text: "Cancel",
          onClick: () => setExitModalVisible(false)
        }}
      />
      <ContentModal
        visible={contentModalVisible}
        title="Listen To Lessons"
        text="You can choose to listen along to lessons or read at your own pace by toggling the sound icon."
        image={require('@assets/images/narration_prompt.png')}
        primaryButton={{
          text: "Listen Now",
          onClick: () => {
            setContentModalVisible(false);
            setSoundMuted(false);
          }
        }}
        secondaryButton={{
          text: "I prefer to read",
          onClick: () => {
            setContentModalVisible(false);
            setSoundMuted(true);
          }
        }}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          hitSlop={buttonsHitSlop}>
          <X
            stroke={Theme.colors.black}
            fill={Theme.colors.transparent}
            width={24}
            height={24}
            strokeWidth={3}
          />
        </TouchableOpacity>
        <ProgressBar 
          value={carouselIndex + 1} 
          max={lessonItems.length} 
          progressBarStyle={styles.progressBar} 
        />
        <TouchableOpacity 
          onPress={() => setSoundMuted(!soundMuted)} 
          hitSlop={buttonsHitSlop}>
          {soundMuted ? (
            <VolumeX stroke={Theme.colors.black} fill={Theme.colors.white} />
          ) : (
            <Volume2 stroke={Theme.colors.black} fill={Theme.colors.white} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.rootContainer}>
        <Carousel
          vertical={false}
          ref={carousel}
          data={currentLessonItems}
          renderItem={renderCarouselItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          onScrollIndexChanged={(index: number) => setCarouselIndex(index)}
          useScrollView={false}
          loop={false}
        />

        <View
          style={[styles.buttonContainer, buttonPadding]}>
          <Button
            disabled={currentQuestionMultiChoice && selectedAnswerId == null}
            squircle={true}
            text={!hasReachedEnd ? 'Continue' : 'Finish'}
            onPress={() => {
              if (currentQuestionMultiChoice) {
                setRevealMultiChoiceAnswer(true);

                const correctAnswer = (lessonItems[carouselIndex] as MultipleChoiceQuestionItem).correctAnswer?.id ?? '';
                if (selectedAnswerId !== correctAnswer) {
                  playAudioFromFile(FeedbackWrong);
                  return;
                }

                playAudioFromFile(FeedbackCorrect);
              }

              if (hasReachedEnd) {
                disposeSound();
                navigation.navigate('LessonComplete', {});
              } else {
                setCurrentLessonItems(lessonItems.slice(0, carouselIndex + 2));
                requestAnimationFrame(() => {
                  carousel.current?.snapToNext(true);
                });
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );

  function renderCarouselItem({item}: {item: BaseLessonItem}): JSX.Element {
    return (
      <ScrollView 
        contentContainerStyle={styles.contentContainer} 
        showsVerticalScrollIndicator={false}>
        {item.type === 'Content' && (
          <GenericContent item={item} />
        )}

        {item.type === 'MultiChoiceQuestion' && (
          <MultipleChoiceQuestion
            item={item}
            onSelectionChanged={(id: string) => setSelectedAnswerId(id)}
            revealAnswer={revealMultiChoiceAnswer}
          />
        )}
      </ScrollView>
    );
  }

  async function playAudioFromFile(soundFile: any) {
    if (soundFile == null) {
      return;
    }

    await localSound?.unloadAsync();
    const {sound} = await Audio.Sound.createAsync(soundFile);

    if (!soundMuted) {
      await sound.playAsync();
    }

    setLocalSound(sound);
  }

  async function playAudioFromUrl(soundUrl?: string | null) {
    if (soundUrl == null) {
      return;
    }

    await networkSound?.unloadAsync();
    const {sound} = await Audio.Sound.createAsync({uri: soundUrl});

    if (!soundMuted) {
      await sound.playAsync();
    }

    setNetworkSound(sound);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundGray,
  },
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  headerContainer: {
    marginTop: Theme.spacing.spacingM,
    marginBottom: Theme.spacing.spacing3XL,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.spacingM
  },
  buttonContainer: {
    backgroundColor: Theme.colors.white,
    paddingTop: Theme.spacing.spacingXL,
    paddingHorizontal: Theme.spacing.spacingM,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderGray
  },
  progressBar: {
    marginLeft: Theme.spacing.spacingS, 
    marginRight: Theme.spacing.spacingM
  },
  contentContainer: {
    paddingBottom: Theme.spacing.spacing3XL, 
  }
});

export default LessonOverview;
