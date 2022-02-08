import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import PriceUtility from 'utility/PriceUtility';
// @ts-ignore
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import PriceChangeFilter from 'components/PriceChangeFilter';
import Security from 'models/Security';
import CurrencyLocale from 'models/CurrencyLocale';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Theme } from 'styles/Index';

interface OverviewRouteProps {
  security: Security;
  currencyLocale: CurrencyLocale;
}

const Overview = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{params: OverviewRouteProps}, 'params'>>();

  const currencyLocale = route.params.currencyLocale;
  const {width: SIZE} = Dimensions.get('window');
  const [isLoading, setIsLoading] = useState(false);
  const [security] = useState<Security>(route.params.security);

  const data = [
    {x: 1453075200, y: 1.47},
    {x: 1453161600, y: 1.37},
    {x: 1453248000, y: 1.53},
    {x: 1453334400, y: 1.54},
    {x: 1453420800, y: 1.52},
    {x: 1453507200, y: 2.03},
    {x: 1453593600, y: 2.1},
    {x: 1453680000, y: 2.5},
    {x: 1453766400, y: 2.3},
    {x: 1453852800, y: 2.42},
    {x: 1453939200, y: 2.55},
    {x: 1454025600, y: 2.41},
    {x: 1454112000, y: 2.43},
    {x: 1454198400, y: 2.2},
  ];

  useEffect(() => {
    navigation.setOptions({headerTitle: security.name});
  }, []);

  const points = monotoneCubicInterpolation({data, range: 40});

  return (
    <GestureHandlerRootView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          color={Theme.colors.purple}
          size="small"
          style={{marginTop: 20}}
        />
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Image
              resizeMode="contain"
              source={{uri: security?.icon}}
              style={{width: 45, height: 45, borderRadius: Theme.radius.large}}
            />
            <View style={{marginLeft: Theme.spacing.spacingM}}>
              <Text style={{...Theme.typography.text.h5}}>{security?.ticker}</Text>
              <Text>
                <Text style={{...Theme.typography.text.h6, ...Theme.typography.weight.normal}}>
                  {PriceUtility.format(
                    security?.investmentValue ?? 0,
                    currencyLocale,
                  )}
                </Text>
                <Text
                  style={[
                    Theme.typography.text.h8,
                    Theme.typography.weight.normal,
                    {
                      color:
                        (security?.investmentGainOrLoss ?? 0) > 0
                          ? Theme.colors.green
                          : Theme.colors.red,
                    },
                  ]}>
                  {'  '}
                  {(security?.investmentGainOrLoss ?? 0) > 0 && '+'}
                  {security?.investmentGainOrLoss.toFixed(2)}%
                </Text>
              </Text>
            </View>
          </View>
          <View style={{marginVertical: 15}}>
            <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
              <ChartPath
                height={SIZE / 2}
                smoothingWhileTransitioningEnable={true}
                stroke={Theme.colors.purple}
                strokeWidth={3}
                selectedStrokeWidth={3}
                width={SIZE - 35}
              />
              <ChartDot style={{backgroundColor: Theme.colors.purple}} />
            </ChartPathProvider>
          </View>
          <PriceChangeFilter useScrollView={false} />
        </View>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.spacingM,
    backgroundColor: '#f5f5f7',
  },
});

export default Overview;
