import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {ChevronRight} from 'react-native-feather';
import {Theme} from 'styles/Index';

interface Props {}

const OutlineChevronButton = (props: Props): JSX.Element => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback>
        <View style={styles.innerButtonContainer}>
          <Text style={styles.title}>Learn More</Text>
          <ChevronRight
            width={26}
            height={26}
            strokeWidth={2.5}
            stroke={Theme.colors.red}
            style={styles.chevron}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Theme.radius.large,
    backgroundColor: Theme.colors.white,
    borderColor: Theme.colors.orange,
    borderWidth: 2
  },
  innerButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.spacingM,
    paddingVertical: Theme.spacing.spacingS + Theme.spacing.spacing3XS
  },
  title: {
    ...Theme.typography.text.h5,
    color: Theme.colors.orange
  },
  chevron: {
    marginLeft: 'auto'
  }
});

export default OutlineChevronButton;
