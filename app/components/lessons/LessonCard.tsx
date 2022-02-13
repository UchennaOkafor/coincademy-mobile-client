import React, {memo} from 'react';
import {
  ImageStyle,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  Image
} from 'react-native';
import equals from 'react-fast-compare';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Check, Clock, Lock, PlayCircle } from 'react-native-feather';
import TouchableSurface from 'components/TouchableSurface';
import { Lesson } from 'codegen/models/Lesson';
import { Theme } from 'styles/Index';

interface Props {
  lesson: Lesson;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const LessonCard = (props: Props): JSX.Element => {
  const bgColor: StyleProp<ViewStyle> = { backgroundColor: props.lesson.locked ? Theme.colors.backgroundGrayDark : Theme.colors.white };
  const titleTextColor: StyleProp<TextStyle> = { color: props.lesson.locked ? Theme.colors.gray : Theme.colors.black };
  const subTitleTextColor: StyleProp<TextStyle> = { color: props.lesson.locked ? Theme.colors.gray : Theme.colors.grayDark };
  const imageOpacity: StyleProp<ImageStyle> = { opacity: props.lesson.locked ? 0.6 : 1 };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableSurface disabled={false} onPress={props.onPress}>
        <View style={[styles.innerContainer, bgColor]}>
          <Image
            resizeMode="cover"
            source={{uri: props.lesson.smallPosterUrl}}
            style={[styles.image, imageOpacity]}
          />
          <View style={styles.contentContainer}>
            <Text style={[styles.title, titleTextColor]} numberOfLines={1}>
              {props.lesson.title}
            </Text>
            <View style={styles.innerContentContainer}>
              <Clock
                style={styles.clockIcon}
                stroke={Theme.colors.gray}
                fill={Theme.colors.transparent}
                width={14}
                height={14}
              />
              <Text style={[styles.subtitle, subTitleTextColor]}>{props.lesson.durationText}</Text>
            </View>
          </View>
          <View style={styles.leadingIconContainer}>
            <LeadingIcon />
          </View>
        </View>
      </TouchableSurface>
    </View>
  );

  function LeadingIcon() {
    return null;

    if (props.lesson.locked) {
      return (
        <Lock
          stroke={Theme.colors.gray}
          fill={Theme.colors.transparent}
          width={20}
          height={20}
          strokeWidth={1.6}
        />
      );
    } else if (props.lesson.progress === 100) {
      return (
        <View style={{ backgroundColor: Theme.colors.purpleLight, borderRadius: 75, width: 38, height: 38, justifyContent: 'center', alignItems: 'center'  }}>
          <Check
            stroke={Theme.colors.white}
            fill={Theme.colors.transparent}
            strokeWidth={2}
            width={28}
            height={28}
          />
        </View>
      );
    } else if (props.lesson.progress === 0) {
      return (
        <PlayCircle
          stroke={Theme.colors.white}
          fill={Theme.colors.purpleLight}
          strokeWidth={1}
          width={46}
          height={46}
        />
      );
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CircularProgress
          value={props.lesson.progress}
          radius={21}
          duration={2000}
          textColor={Theme.colors.black}
          textStyle={{...Theme.typography.text.h7, fontWeight: Platform.select({android: undefined, ios: '700'})}} 
          maxValue={100}
          title={undefined}
          titleColor={undefined}
          titleStyle={undefined}
          titleFontSize={undefined}
          activeStrokeWidth={3}
          inActiveStrokeWidth={2}
          activeStrokeColor={Theme.colors.purpleLight}
          inActiveStrokeColor={Theme.colors.purpleBorder}
          circleBackgroundColor={Theme.colors.transparent}      
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden', 
    borderRadius: Theme.radius.large,
    shadowColor: Theme.colors.grayDark,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.10,
    shadowRadius: 1.00,
    elevation: 0.5,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.spacingS,
    paddingVertical: Theme.spacing.spacingXS,
  },
  contentContainer: {
    flex: 1,
  },
  innerContentContainer: {
    flexDirection: 'row',
    marginTop: Theme.spacing.spacing2XS,
    alignItems: 'center',
    marginHorizontal: Theme.spacing.spacingM,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: Theme.radius.large,
  },
  title: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.medium,
    flexWrap: 'wrap',
    marginHorizontal: Theme.spacing.spacingM,
  },
  subtitle: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.normal,
  },
  leadingIconContainer: {
    width: 50, 
    alignItems: 'center'
  },
  clockIcon: {
    marginRight: Theme.spacing.spacing2XS
  }
});

export default memo(LessonCard, equals);
