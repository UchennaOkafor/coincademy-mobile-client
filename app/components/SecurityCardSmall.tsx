import Security from 'models/Security';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TrendingDown, TrendingUp} from 'react-native-feather';
import { Theme } from 'styles/Index';
import PercentageUtility from 'utility/PercentageUtility';
import Badge from './badge/Badge';

interface Props {
  badge?: string;
  security: Security;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const SecurityCardSmall = (props: Props): JSX.Element => {
  const priceChange = PercentageUtility.getFormat(
    props.security.investmentGainOrLoss,
  );
  const TrendingIcon =
    props.security.investmentGainOrLoss < 0 ? TrendingDown : TrendingUp;

  return (
    <View style={[styles.container, props.style]}>
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.innerContainer}>
          <View style={styles.imageRow}>
            <FastImage
              resizeMode="contain"
              source={{uri: props.security.icon}}
              style={styles.icon}
            />
            {!!props.badge && <Badge title={props.badge} primaryColor={Theme.colors.gray} />}
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.name} numberOfLines={1}>
              {props.security.name}
            </Text>
            <Text style={styles.price}>£0.00</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            {props.security.investmentGainOrLoss !== 0 && (
              <TrendingIcon
                stroke={priceChange.color}
                fill={Theme.colors.transparent}
                width={18}
                height={18}
                style={{marginRight: Theme.spacing.spacingXS}}
              />
            )}
            <Text style={[styles.percentageChange, {color: priceChange.color}]}>
              {priceChange.value}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.radius.large,
    overflow: 'hidden',
  },
  innerContainer: {
    width: 150,
    padding: Theme.spacing.spacingM,
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: Theme.radius.normal,
  },
  badge: {
    ...Theme.typography.text.h8,
    ...Theme.typography.weight.medium,
    color: Theme.colors.white,
    paddingHorizontal: Theme.spacing.spacingXS + Theme.spacing.spacing3XS,
    paddingVertical: Theme.spacing.spacing3XS,
    backgroundColor: Theme.colors.gray,
    borderRadius: Theme.radius.large,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    ...Theme.typography.text.h6,
  },
  price: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.normal,
    color: Theme.colors.grayDark,
  },
  percentageChange: {
    ...Theme.typography.text.h8,
    ...Theme.typography.weight.medium,
  },
});

export default SecurityCardSmall;
