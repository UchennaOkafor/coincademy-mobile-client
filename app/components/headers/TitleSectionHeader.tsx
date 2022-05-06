import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import {Theme} from 'styles/Index';

interface Props {
  title: string;
  titleIcon?: JSX.Element;
  rightText?: string;
  rightTextOnPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const TitleSectionHeader = (props: Props): JSX.Element => {
  return (
    <View style={props.containerStyle}>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        {props.titleIcon}
        <TouchableOpacity 
          style={styles.rightTextContainer} 
          onPress={props.rightTextOnPress}>
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
    ...Theme.typography.weight.medium,
    marginRight: Theme.spacing.spacingXS,
    textAlign: 'left'
  },
  rightTextContainer: {
    marginLeft: 'auto',
  },
  rightText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.medium,
    color: Theme.colors.purple,
    alignSelf: 'flex-end'
  }
});

export default TitleSectionHeader;
