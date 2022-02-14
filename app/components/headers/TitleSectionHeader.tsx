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
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{props.title}</Text>
        {props.titleIcon}
        <TouchableOpacity
          style={styles.rightTextContainer}>
          <Text style={styles.rightText}>{props.rightText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  title: {
    ...Theme.typography.text.h5,
    marginRight: Theme.spacing.spacingXS,
    textAlign: 'left'
  },
  rightTextContainer: {
    marginLeft: 'auto', 
    marginRight: Theme.spacing.spacing3XS
  },
  rightText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.medium,
    color: Theme.colors.purple,
    alignSelf: 'flex-end',
  },
});

export default TitleSectionHeader;
