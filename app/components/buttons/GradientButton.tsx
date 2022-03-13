import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Theme} from 'styles/Index';
import MaskedSquircleView from '../MaskedSquircleView';

interface Props {
  text: string;
  onPress: () => void;
  squircle?: boolean;
}

const GradientButton = (props: Props): JSX.Element => {
  const ButtonView = props.squircle === true && Platform.OS === 'ios' ? MaskedSquircleView : View;

  return (
    <ButtonView style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[Theme.colors.orange, Theme.colors.purple]}
        style={styles.buttonContainer}>
        <TouchableNativeFeedback onPress={props.onPress}>
          <View style={styles.innerButtonContainer}>
            <Text style={styles.title}>{props.text}</Text>
          </View>
        </TouchableNativeFeedback>
      </LinearGradient>
    </ButtonView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Theme.radius.large + Theme.radius.extraSmall
  },
  innerButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.spacingM,
    paddingVertical: Theme.spacing.spacingS + Theme.spacing.spacing2XS
  },
  title: {
    ...Theme.typography.text.h5,
    color: Theme.colors.white
  }
});

export default GradientButton;
