import CurrencyLocale from 'models/CurrencyLocale';
import React from 'react';
import isEqual from 'react-fast-compare';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from 'styles/Index';
import PercentageUtility from 'utility/PercentageUtility';
import PriceUtility from 'utility/PriceUtility';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  amount: number;
  percentageChange: number;
  locale: CurrencyLocale;
}

const PortfolioCard = (props: Props): JSX.Element => {
  const percentage = PercentageUtility.getFormat(props.percentageChange);

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={[Theme.colors.orange, Theme.colors.purple]}
      style={[styles.cardContainer, props.containerStyle]}>
      <View style={styles.itemsContainer}>
        <Text style={styles.amountTitle}>Market Cap</Text>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.amount}>
          {PriceUtility.formatMarketCap(props.amount, props.locale)}
        </Text>
        <Text style={styles.percentageChangeContainer}>
          <Text style={[styles.percentageChange, {color: percentage.color}]}>
            {percentage.value}
          </Text>
          <Text style={styles.percentageChangeTimeUnit}> 24HR</Text>
        </Text>
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
    flexDirection: 'column',
  },
  amountTitle: {
    ...Theme.typography.text.h6,
    color: Theme.colors.white,
  },
  amount: {
    ...Theme.typography.text.h2,
    color: Theme.colors.white,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percentageChangeContainer: {
    alignSelf: 'center',
    marginTop: Theme.spacing.spacing2XS,
  },
  percentageChange: {
    ...Theme.typography.text.h7,
    color: Theme.colors.green,
  },
  percentageChangeTimeUnit: {
    ...Theme.typography.text.h7,
    color: Theme.colors.white,
  },
});

export default React.memo(PortfolioCard, isEqual);
