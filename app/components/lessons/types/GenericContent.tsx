import React, {memo, useEffect, useState} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import equals from 'react-fast-compare';
import { Theme } from 'styles/Index';
import { ContentSlide } from 'codegen/models/ContentSlide';
import LottieView from 'lottie-react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

interface Props {
  item: ContentSlide;
}

const GenericContent = (props: Props): JSX.Element => {
  const [lottieAnimation, setLottieAnimation] = useState();

  useEffect(() => {
    const initializeContent = async () => {
      if (props.item.lottieUrl) {
        try {
          const response = await fetch(props.item.lottieUrl);
          const data = await response.json();
          setLottieAnimation(data)
        } catch (error) {
          console.log(error);
        }
      }
    };

    initializeContent();
  }, []);

  return (
    <>
      {props.item.lottieUrl && (
        <>
          {lottieAnimation ? (
            <LottieView 
              source={lottieAnimation}
              loop
              autoPlay
              style={{ height: 225, alignSelf: 'center', marginBottom: Theme.spacing.spacing2XL }}
            />
          ) : (
            <View style={{ height: 225, alignSelf: 'center', marginBottom: Theme.spacing.spacing2XL }} />
          )}
        </>
      )}
      {props.item.imageUrl && (
        <Image 
          source={{uri: props.item.imageUrl}} 
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {props.item.videoUrl && (
        <Video
          shouldPlay
          useNativeControls
          source={{uri: props.item.videoUrl}}
          resizeMode='cover'
          style={[styles.video, { height: Platform.OS === 'android' ? 200 : 250 }]}
        />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{props.item.title}</Text>
        <Text style={styles.content}>
          {props.item.content}
        </Text>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  image: {
    marginBottom: Theme.spacing.spacingL, 
    height: 225
  },
  video: {
    marginBottom: Theme.spacing.spacingL
  },
  contentContainer: {
    paddingHorizontal: Theme.spacing.spacingM
  },
  title: {
    ...Theme.typography.text.h4, 
    marginBottom: Theme.spacing.spacingS
  },
  content: {
    ...Theme.typography.text.body, 
    marginBottom: Theme.spacing.spacingXL
  }
});

export default memo(GenericContent, equals);
