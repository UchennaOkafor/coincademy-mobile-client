import React, {memo} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Image
} from 'react-native';
import equals from 'react-fast-compare';
import TouchableSurface from 'components/TouchableSurface';
import { Lesson } from 'codegen/models/Lesson';
import { Theme } from 'styles/Index';

interface Props {
  lesson: Lesson;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const FeaturedLessonCard = (props: Props): JSX.Element => {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableSurface onPress={props.onPress} androidDelayPressIn={75}>
        <View style={styles.innerContainer}>
          <Image
            resizeMode="contain"
            source={{ uri: props.lesson.largePosterUrl ?? props.lesson.smallPosterUrl }}
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {props.lesson.title}
            </Text>
            <View style={styles.innerContentContainer}>
              <Text style={styles.subtitle}>{props.lesson.durationText}  </Text>
              <Text style={styles.subtitle}>•  Earn 3.5 EKO</Text>
            </View>
          </View>
        </View>
      </TouchableSurface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: Theme.radius.large,
  },
  innerContainer: {
    backgroundColor: Theme.colors.white,
  },
  contentContainer: {
    paddingHorizontal: Theme.spacing.spacingM,
    padding: Theme.spacing.spacingS + Theme.spacing.spacing3XS,
  },
  innerContentContainer: {
    flexDirection: 'row',
    marginTop: Theme.spacing.spacing2XS + Theme.spacing.spacing3XS,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 155,
  },
  title: {
    ...Theme.typography.text.h5,
    flexWrap: 'wrap',
  },
  authorIcon: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    marginRight: Theme.spacing.spacingXS,
  },
  author: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.normal,
    color: Theme.colors.grayDark,
  },
  subtitle: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.normal,
    color: Theme.colors.grayDark,
  },
});

export default memo(FeaturedLessonCard, equals);
