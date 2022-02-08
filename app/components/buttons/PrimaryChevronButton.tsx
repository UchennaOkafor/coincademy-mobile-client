import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Theme } from 'styles/Index';

interface Props {}

const PrimaryChevronButton = (props: Props): JSX.Element => {
  const img =
    'https://cdn4.iconfinder.com/data/icons/geomicons/32/672374-chevron-right-512.png';

  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback>
        <View style={styles.innerButtonContainer}>
          <Text style={styles.title}>Learn More</Text>
          <Image style={styles.chevron} source={{uri: img}} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Theme.radius.normal,
    backgroundColor: Theme.colors.purple,
  },
  innerButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.spacingM,
    paddingVertical: Theme.spacing.spacingS + Theme.spacing.spacing2XS,
  },
  title: {
    ...Theme.typography.text.h5,
    color: Theme.colors.white,
  },
  chevron: {
    tintColor: Theme.colors.white,
    width: 18,
    height: 18,
    marginLeft: 'auto',
  },
});

export default PrimaryChevronButton;
