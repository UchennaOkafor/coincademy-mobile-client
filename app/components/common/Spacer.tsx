import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Theme} from 'styles/Index';

interface Props {
  vertical?: number;
  horizontal?: number;
}

const Spacer = (props: Props): JSX.Element => {
  const defaultSpacing = Theme.spacing.spacingS - Theme.spacing.spacing3XS;
  const verticalSpacing = props.vertical ?? defaultSpacing;
  const horizontalSpacing = props.horizontal ?? defaultSpacing;

  const spacingStyle: StyleProp<ViewStyle> = {
    marginVertical: verticalSpacing,
    marginHorizontal: horizontalSpacing
  };

  return <View style={spacingStyle} />;
};

export default Spacer;
