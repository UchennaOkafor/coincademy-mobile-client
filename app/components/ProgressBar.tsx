import {MotiView} from 'moti';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Theme} from 'styles/Index';

interface Props {
  value: number;
  max: number;
  progressBarStyle?: StyleProp<ViewStyle>;
  progressValueStyle?: StyleProp<ViewStyle>;
}

const ProgressBar = (props: Props): JSX.Element => {
  const progressValue = (props.value / props.max) * 100;

  return (
    <View style={[styles.progressBar, props.progressBarStyle]}>
      <MotiView
        style={{flexGrow: 1}}
        from={{width: '0%'}}
        animate={{width: `${progressValue}%`}}
        transition={{type: 'spring', damping: 100, stiffness: 50}}>
        <View style={[styles.progressValue, props.progressValueStyle]} />
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: Theme.colors.backgroundGrayDark,
    borderRadius: Theme.radius.normal + Theme.radius.extraSmall,
    height: 24
  },
  progressValue: {
    flexGrow: 1,
    backgroundColor: Theme.colors.green,
    width: '100%',
    borderRadius: Theme.radius.normal
  }
});

export default memo(ProgressBar, isEqual);
