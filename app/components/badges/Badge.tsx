import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
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
    borderRadius: Theme.radius.small + Theme.radius.extraSmall,
    paddingHorizontal: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
    paddingVertical: Theme.spacing.spacing3XS
  },
  title: {
    ...Theme.typography.text.h8,
    ...Theme.typography.weight.medium,
    color: Theme.colors.white,
    lineHeight: Platform.select({ ios: null, android: 15 }) as number | undefined
  }
});

export default Badge;
