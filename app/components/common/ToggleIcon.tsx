import RNBounceable from '@freakycoder/react-native-bounceable';
import React, { useState } from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import { Heart } from 'react-native-feather';
import {Theme} from 'styles/Index';

interface Props {
  size?: number;
  onChecked?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const ToggleIcon = (props: Props): JSX.Element => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <RNBounceable
      style={props.style}
      bounceEffect={0.8}
      onPress={() => {
        setIsLiked(!isLiked);
        props.onChecked?.(isLiked);
      }}
      hitSlop={{
        top: Theme.spacing.spacingM,
        bottom: Theme.spacing.spacingM,
        left: Theme.spacing.spacingM,
        right: Theme.spacing.spacingM
      }}>
      <Heart
        stroke={Theme.colors.red}
        fill={isLiked ? Theme.colors.red : Theme.colors.transparent}
        width={props.size ?? 16}
        height={props.size ?? 16}
        strokeWidth={2}
      />
    </RNBounceable>
  )
};

export default ToggleIcon;
