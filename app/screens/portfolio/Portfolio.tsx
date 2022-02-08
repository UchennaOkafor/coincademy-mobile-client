import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, StyleSheet, Text, View} from 'react-native';
import SecurityCardList from '../../components/SecurityCardList';
import {FloatingAction} from 'react-native-floating-action';
import Security from '../../models/Security';
import PortfolioCard from '../../components/PortfolioCard';
import {useNavigation} from '@react-navigation/native';
import {Bookmark, Download, Mic, Video} from 'react-native-feather';
import CurrencyLocale from '@models/CurrencyLocale';
import CoinGeckoApiService from 'services/CoinGeckoApiService';
import Header from 'components/headers/Header';
import CoinPaprikaApiService from 'services/CoinPaprikaApiService';
import { Theme } from 'styles/Index';

const Portfolio = () => {
  const navigation = useNavigation();

  const [securities, setSecurities] = useState<Security[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [globalMarketData, setGlobalMarketData] = useState<any>();

  const [currencyLocale] = useState<CurrencyLocale>({
    locale: 'en-US',
    currency: 'USD',
  });

  const initialize = useCallback(async () => {
    const cryptos = await CoinGeckoApiService.getTopCryptos(
      100,
      currencyLocale.currency,
    );
    const marketData = await CoinPaprikaApiService.getGlobalStats();

    setGlobalMarketData(marketData);
    setSecurities(cryptos);
    setIsLoading(false);
  }, [currencyLocale]);

  useEffect(() => {
    initialize();
    const intervalSubsription = setInterval(initialize, 30000);

    return () => {
      clearInterval(intervalSubsription);
    };
  }, [initialize]);

  return (
    <View style={styles.container}>
      <SecurityCardList
        locale={currencyLocale}
        maxLength={100}
        securities={securities}
        contentContainerStyle={styles.cardListContentContainer}
        onViewAllPressed={() => navigation.navigate('Investments')}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={async () => {
              setIsRefreshing(true);
              await initialize();
              setIsRefreshing(false);
            }}
          />
        }
        onPress={(security: Security) =>
          navigation.navigate('SecurityOverview', {security, currencyLocale})
        }
        headerComponent={renderContentBeforeFlatList}
      />
    </View>
  );

  function renderContentBeforeFlatList() {
    return (
      <>
        <Header title="Portfolio" />
        <PortfolioCard
          amount={globalMarketData?.market_cap_usd ?? 0}
          percentageChange={globalMarketData?.market_cap_change_24h ?? 0}
          locale={currencyLocale}
          containerStyle={styles.portfolioCardContainer}
        />
        <Text style={styles.investmentsText}>Investments</Text>
        {isLoading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size={28}
            color={Theme.colors.purple}
          />
        )}
      </>
    );
  }

  function renderContentAfterFlatList() {}

  function floatingActionButton() {
    const actions = [
      {
        text: 'Bookmark',
        icon: (
          <Bookmark
            stroke="#fff"
            fill={Theme.colors.transparent}
            width={20}
            height={20}
          />
        ),
        name: 'bt_accessibility',
        position: 2,
      },
      {
        text: 'Record',
        icon: (
          <Mic stroke="#fff" fill={Theme.colors.transparent} width={20} height={20} />
        ),
        name: 'bt_language',
        position: 1,
        color: 'red',
        tintColor: 'blue',
      },
      {
        text: 'Capture',
        icon: (
          <Video
            stroke="#fff"
            fill={Theme.colors.transparent}
            width={20}
            height={20}
          />
        ),
        name: 'bt_room',
        position: 3,
      },
      {
        text: 'Download',
        icon: (
          <Download
            stroke="#fff"
            fill={Theme.colors.transparent}
            width={20}
            height={20}
          />
        ),
        name: 'bt_videocam',
        position: 4,
      },
    ];

    return (
      <FloatingAction
        // overlayColor="transparent"
        color={Theme.colors.purple}
        // iconHeight={26}
        // iconWidth={26}
        // buttonSize={60}
        // floatingIcon={}
        distanceToEdge={{
          horizontal: 20,
          vertical: 20,
        }}
        actions={actions}
        onPressItem={name => {
          console.log(`selected button: ${name}`);
        }}
        onPressMain={() => {}}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  portfolioCardContainer: {
    marginBottom: Theme.spacing.spacingL,
    marginHorizontal: -Theme.spacing.spacing2XS,
  },
  cardListContentContainer: {
    paddingHorizontal: Theme.spacing.spacingM,
  },
  investmentsText: {
    ...Theme.typography.text.h5,
    ...Theme.typography.weight.medium,
    marginBottom: Theme.spacing.spacingS,
    paddingHorizontal: Theme.spacing.spacing2XS,
  },
  activityIndicator: {
    marginVertical: Theme.spacing.spacing3XL,
    alignSelf: 'center',
  },
});

export default Portfolio;
