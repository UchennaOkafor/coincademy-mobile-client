import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from 'styles/Index';

interface Props {
  title: string;
  titleIcon?: JSX.Element;
  rightText?: string;
  style?: StyleProp<ViewStyle>;
}

const TitleSectionHeader = (props: Props): JSX.Element => {
  return (
    <View style={props.style}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.title}>{props.title}</Text>
        {props.titleIcon}
        <TouchableOpacity
          onPress={() => {}}
          style={{marginLeft: 'auto', marginRight: 2}}>
          <Text style={styles.rightText}>{props.rightText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Theme.typography.text.h5,
    marginRight: Theme.spacing.spacingXS,
  },
  rightText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.medium,
    color: Theme.colors.purple,
    alignSelf: 'flex-end',
  },
});

export default TitleSectionHeader;
