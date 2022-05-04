import RNBounceable from '@freakycoder/react-native-bounceable';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import { Heart } from 'react-native-feather';
import {Theme} from 'styles/Index';

interface Props {
  initialValue?: boolean;
  size?: number;
  onChecked?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export interface ToggleIconRef {
  setChecked: (value: boolean) => void;
  toggle: () => void;
}

let ToggleIcon = (props: Props, ref: React.ForwardedRef<ToggleIconRef>): JSX.Element => {
  const [isLiked, setIsLiked] = useState(props.initialValue ?? false);
  const bounceable = useRef<RNBounceable>(null);

  useImperativeHandle(ref, () => ({
    setChecked: (value: boolean) => {
      setIsLiked(value);
      props.onChecked?.(value);
    },
    toggle: () => {
      bounceable.current?.onPress();
    }
  }));

  return (
    <RNBounceable
      ref={bounceable}
      style={props.style}
      bounceEffect={0.8}
      onPress={() => {
        setIsLiked(!isLiked);
        props.onChecked?.(!isLiked);
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

export default forwardRef(ToggleIcon);
