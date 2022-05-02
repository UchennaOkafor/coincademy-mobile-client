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
import TouchableSurface from 'components/layout/TouchableSurface';
import {Lesson} from 'codegen/models/Lesson';
import {Theme} from 'styles/Index';
import Badge from 'components/badges/Badge';
import { Clock } from 'react-native-feather';

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
            source={{
              uri: props.lesson.coverUrl ?? props.lesson.iconUrl
            }}
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {props.lesson.title}
              </Text>
              <View style={styles.subtitleContainer}>
                <Clock
                  stroke={Theme.colors.gray}
                  fill={Theme.colors.transparent}
                  width={16}
                  height={16}
                />
                <Text style={styles.subtitle}>
                  {props.lesson.durationText}
                  {/* {props.lesson.durationText} • Earn 3.5 EKO */}
                </Text>
              </View>
            </View>
            {/* <View style={styles.rightContentContainer}>
              <Badge 
                title="Promoted" 
                primaryColor={Theme.colors.purpleLight} 
              />
            </View> */}
          </View>
        </View>
      </TouchableSurface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: Theme.radius.large
  },
  innerContainer: {
    backgroundColor: Theme.colors.white
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.spacingM,
    paddingVertical: Theme.spacing.spacingS + Theme.spacing.spacing3XS
  },
  rightContentContainer: {
    alignSelf: 'center'
  },
  image: {
    width: '100%',
    height: 155
  },
  title: {
    ...Theme.typography.text.h5,
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  subtitleContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: Theme.spacing.spacing2XS + Theme.spacing.spacing3XS
  },
  subtitle: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.normal,
    color: Theme.colors.grayDark,
    textAlign: 'left',
    marginLeft: Theme.spacing.spacing2XS + Theme.spacing.spacing3XS
  }
});

export default memo(FeaturedLessonCard, equals);
