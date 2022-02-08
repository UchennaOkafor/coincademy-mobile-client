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
  const hasVideo = false;
  const [lottieAnimation, setLottieAnimation] = useState();

  useEffect(() => {
    fetch(props.item.lottieUrl, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((responseData) => {
        setLottieAnimation(responseData)
    })
    .catch((error) => {
        console.log(error);
    })
  }, []);

  return (
    <>
      {lottieAnimation && (
        <LottieView 
          source={lottieAnimation}
          loop
          autoPlay
          style={{ height: 225, alignSelf: 'center', marginBottom: Theme.spacing.spacing2XL }}
        />
      )}
      {props.item.imageUrl && (
        <Image 
          source={{uri: props.item.imageUrl}} 
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {hasVideo && (
        <Video
          shouldPlay
          useNativeControls
          source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
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
