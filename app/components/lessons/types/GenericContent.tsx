import React, {memo} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import equals from 'react-fast-compare';
import {Theme} from 'styles/Index';
import { ContentItem} from 'codegen/models/ContentItem';
import {ResizeMode, Video} from 'expo-av';
import LottieView from 'components/lottie/LottieView';

interface Props {
  item: ContentItem;
}

const GenericContent = (props: Props): JSX.Element => {
  return (
    <>
      {props.item.lottieUrl && (
        <LottieView
          loop
          autoPlay
          source={{uri: props.item.lottieUrl}}
          style={styles.lottieContainer}
        />
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
          resizeMode={ResizeMode.COVER}
          style={styles.video}
        />
      )}
      {(props.item.title || props.item.content) && (
        <View style={styles.contentContainer}>
          {props.item.title && (
            <Text style={styles.title}>{props.item.title}</Text>
          )}
          {props.item.content && (
            <Text style={styles.content}>{props.item.content}</Text>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    marginBottom: Theme.spacing.spacingL,
    height: 225
  },
  video: {
    marginBottom: Theme.spacing.spacingL,
    height: Platform.OS === 'android' ? 200 : 250
  },
  contentContainer: {
    paddingHorizontal: Theme.spacing.spacingM
  },
  title: {
    ...Theme.typography.text.h4,
    marginBottom: Theme.spacing.spacingS,
    textAlign: 'left'
  },
  content: {
    ...Theme.typography.text.body,
    marginBottom: Theme.spacing.spacingXL,
    textAlign: 'left'
  },
  lottieContainer: {
    height: 225,
    alignSelf: 'center',
    marginBottom: Theme.spacing.spacing2XL
  }
});

export default memo(GenericContent, equals);
