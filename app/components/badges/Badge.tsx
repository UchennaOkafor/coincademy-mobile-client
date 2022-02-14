import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from 'styles/Index';

interface Props {
  title: string;
  primaryColor: string;
}

const Badge = (props: Props): JSX.Element => {
  return (
    <View style={[styles.container, {backgroundColor: props.primaryColor}]}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: Theme.radius.large,
    paddingHorizontal: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
    paddingVertical: Theme.spacing.spacing3XS
  },
  title: {
    ...Theme.typography.text.h8,
    ...Theme.typography.weight.medium,
    color: Theme.colors.white
  }
});

export default Badge;
