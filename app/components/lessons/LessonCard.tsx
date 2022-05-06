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
import {Check, ChevronRight, Clock, Lock, PlayCircle} from 'react-native-feather';
import TouchableSurface from 'components/layout/TouchableSurface';
import {Lesson} from 'codegen/models/Lesson';
import {Theme} from 'styles/Index';

interface Props {
  lesson: Lesson;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const LessonCard = (props: Props): JSX.Element => {
  const bgColor: StyleProp<ViewStyle> = {
    backgroundColor: props.lesson.locked
      ? Theme.colors.backgroundGrayDark
      : Theme.colors.white
  };
  const titleTextColor: StyleProp<TextStyle> = {
    color: props.lesson.locked ? Theme.colors.gray : Theme.colors.black
  };
  const subTitleTextColor: StyleProp<TextStyle> = {
    color: props.lesson.locked ? Theme.colors.gray : Theme.colors.grayDark
  };
  const imageOpacity: StyleProp<ImageStyle> = {
    opacity: props.lesson.locked ? 0.6 : 1
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableSurface disabled={false} onPress={props.onPress}>
        <View style={[styles.innerContainer, bgColor]}>
          <View style={styles.image}>
            <Image
              resizeMode="cover"
              source={{uri: props.lesson.iconUrl}}
              style={[styles.image, imageOpacity]}
            />
          </View>
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
              <Text style={[styles.subtitle, subTitleTextColor]}>
                {props.lesson.durationText}
              </Text>
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
    return (
      <ChevronRight
        stroke={Theme.colors.blue}
        fill={Theme.colors.transparent}
        strokeWidth={2.5}
        width={22}
        height={22}
        style={styles.chevronRightIcon}
      />
    );

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
        <View
          style={{
            backgroundColor: Theme.colors.purpleLight,
            borderRadius: 75,
            width: 38,
            height: 38,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CircularProgress
          value={props.lesson.progress}
          radius={21}
          duration={2000}
          textColor={Theme.colors.black}
          textStyle={{
            ...Theme.typography.text.h7,
            fontWeight: Platform.select({android: undefined, ios: '700'})
          }}
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
      height: 0.5
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 0.5
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.spacingS,
    paddingVertical: Theme.spacing.spacingXS
  },
  contentContainer: {
    flex: 1
  },
  innerContentContainer: {
    flexDirection: 'row',
    marginTop: Theme.spacing.spacing2XS,
    alignItems: 'center',
    marginHorizontal: Theme.spacing.spacingM
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.large,
    overflow: 'hidden'
  },
  title: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.normal,
    marginHorizontal: Theme.spacing.spacingM,
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  subtitle: {
    ...Theme.typography.text.h8,
    ...Theme.typography.weight.normal,
    textAlign: 'left'
  },
  leadingIconContainer: {
    width: 50,
    alignItems: 'center'
  },
  clockIcon: {
    marginRight: Theme.spacing.spacing2XS
  },
  chevronRightIcon: {
    marginLeft: Theme.spacing.spacingM
  }
});

export default memo(LessonCard, equals);
