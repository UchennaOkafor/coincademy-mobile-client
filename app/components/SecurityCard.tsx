import CurrencyLocale from 'models/CurrencyLocale';
import React, {memo} from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import PriceUtility from 'utility/PriceUtility';
import Security from '../models/Security';
import FastImage from 'react-native-fast-image';
import PercentageUtility from 'utility/PercentageUtility';
import isEqual from 'react-fast-compare';
import { Theme } from 'styles/Index';

interface Props {
  security: Security;
  onPress: () => void;
  locale: CurrencyLocale;
}

const SecurityCard = (props: Props): JSX.Element => {
  const gainsChange = PercentageUtility.getFormat(
    props.security.investmentGainOrLoss,
  );
  const formattedPrice = PriceUtility.format(
    props.security.investmentValue,
    props.locale,
  );

  return (
    <View style={styles.cardContainer}>
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.cardInnerContainer}>
          <View style={styles.cardIconContainer}>
            <FastImage
              resizeMode="contain"
              source={{uri: props.security.icon}}
              style={styles.cardIcon}
            />
          </View>
          <View>
            <Text style={styles.name}>{props.security.name}</Text>
            <Text style={styles.ticker}>
              {props.security.ticker}
              {/* • {props.security.shares} Shares */}
            </Text>
          </View>
          <View style={styles.cardRightContainer}>
            <Text style={styles.investmentValueText}>{formattedPrice}</Text>
            <Text
              style={[
                styles.investmentGainOrLossText,
                {color: gainsChange.color},
              ]}>
              {gainsChange.value}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    borderRadius: Theme.radius.large,
    marginBottom: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
  },
  cardInnerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Theme.colors.white,
    paddingVertical: Theme.spacing.spacingS,
    paddingHorizontal: Theme.spacing.spacingM,
  },
  cardIconContainer: {
    marginRight: Theme.spacing.spacingL,
  },
  cardIcon: {
    height: 30,
    width: 30,
    borderRadius: Theme.radius.normal,
  },
  name: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.semiBold,
    marginBottom: Theme.spacing.spacing3XS,
  },
  ticker: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.normal,
  },
  cardRightContainer: {
    marginLeft: 'auto',
  },
  investmentValueText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.medium,
    textAlign: 'right',
    marginBottom: Theme.spacing.spacing3XS,
  },
  investmentGainOrLossText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.medium,
    textAlign: 'right',
  },
});

export default memo(SecurityCard, isEqual);
