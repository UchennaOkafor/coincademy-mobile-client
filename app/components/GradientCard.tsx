import React from 'react';
import isEqual from 'react-fast-compare';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import{LinearGradient} from 'expo-linear-gradient';
import { Theme } from 'styles/Index';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
}

const GradientCard = (props: Props): JSX.Element => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[Theme.colors.orange, Theme.colors.purple]}
      style={[styles.cardContainer, props.containerStyle]}>
      <View style={styles.itemsContainer}>
        <Text style={styles.text}>GradientCard.tsx</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: Theme.spacing.spacingL,
    paddingTop: Theme.spacing.spacingM + Theme.spacing.spacing3XS,
    paddingBottom: Theme.spacing.spacingM,
    borderRadius: Theme.radius.extraLarge,
  },
  text: {
    ...Theme.typography.text.h5,
    color: Theme.colors.white,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default React.memo(GradientCard, isEqual);
