import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from 'components/headers/Header';

import {
  BarChart2,
  Search,
  TrendingDown,
  TrendingUp,
  X,
} from 'react-native-feather';
import SearchBar from '@nghinv/react-native-search-bar';
import {ScrollView} from 'react-native-gesture-handler';
import Security from 'models/Security';
import CoinGeckoApiService from 'services/CoinGeckoApiService';
import TitleSectionHeader from 'components/headers/TitleSectionHeader';
import HorizontalSecurityCardList from 'components/HorizontalSecurityCardList';
import CurrencyLocale from 'models/CurrencyLocale';
import { Theme } from 'styles/Index';

const Explore = (): JSX.Element => {
  const navigation = useNavigation();
  const [trendingSecurities, setTrendingSecurities] = useState<Security[]>([]);
  const [isTrendingSecuritiesLoading, setIsTrendingSecuritiesLoading] =
    useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [currencyLocale] = useState<CurrencyLocale>({
    locale: 'en-US',
    currency: 'usd',
  });

  const [text, setText] = useState('');
  const onChangeText = useCallback(value => setText(value), []);

  const initialize = async () => {
    const trending = await CoinGeckoApiService.getTrendingCryptos();
    setTrendingSecurities(trending);
    setIsTrendingSecuritiesLoading(false);
  };

  useEffect(() => {
    initialize();

    return () => {};
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={async () => {
            setIsRefreshing(true);
            await initialize();
            setIsRefreshing(false);
          }}
        />
      }>
      <View style={{paddingHorizontal: Theme.spacing.spacingM}}>
        <Header title="Explore" />
        <SearchBar
          placeholder="Search"
          containerStyle={styles.searchBarStyle}
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={() => {
            console.log('Done');
          }}
          searchIcon={
            <Search
              strokeWidth={3}
              stroke={Theme.colors.gray}
              fill={Theme.colors.transparent}
              width={16}
              height={16}
            />
          }
          clearIcon={
            <X
              stroke="rgba(0, 0, 0, 0.6)"
              fill={Theme.colors.transparent}
              width={14}
              height={14}
            />
          }
          cancelTitleStyle={{
            ...Theme.typography.text.h6,
            ...Theme.typography.weight.semiBold,
            color: Theme.colors.purple,
          }}
          textInputStyle={{...Theme.typography.text.h6, ...Theme.typography.weight.medium}}
          borderRadius={Theme.radius.large}
          // theme={theme.textInput}
        />
      </View>

      <View style={styles.exploreSectionContainer}>
        <TitleSectionHeader
          title="Recently viewed"
          style={styles.titleSectionHeader}
        />
      </View>

      <View style={styles.exploreSectionContainer}>
        <TitleSectionHeader
          title="Trending"
          titleIcon={
            <BarChart2
              strokeWidth={3}
              stroke={Theme.colors.grayDark}
              fill={Theme.colors.transparent}
              width={18}
              height={18}
            />
          }
          style={styles.titleSectionHeader}
        />
        <HorizontalSecurityCardList
          securities={trendingSecurities}
          onPress={(security: Security) =>
            navigation.navigate('SecurityOverview', {security, currencyLocale})
          }
          loading={isTrendingSecuritiesLoading}
          loadingComponent={<ActivityIndicator color={Theme.colors.blue} />}
          emptyComponent={<Text>No trending cryptos</Text>}
          contentContainertStyle={{paddingLeft: Theme.spacing.spacingM}}
          cardStyle={{
            marginRight: Theme.spacing.spacingM,
            marginVertical: Theme.spacing.spacing3XS,
            elevation: 1,
          }}
        />
      </View>

      <View style={styles.exploreSectionContainer}>
        <TitleSectionHeader
          title="Biggest Gainers"
          titleIcon={
            <TrendingUp
              strokeWidth={3}
              stroke={Theme.colors.green}
              fill={Theme.colors.transparent}
              width={18}
              height={18}
            />
          }
          rightText="View all"
          style={styles.titleSectionHeader}
        />
        <Text style={styles.notFoundText}>No big gainers</Text>
      </View>

      <View style={styles.exploreSectionContainer}>
        <TitleSectionHeader
          title="Biggest Loosers"
          titleIcon={
            <TrendingDown
              strokeWidth={3}
              stroke={Theme.colors.red}
              fill={Theme.colors.transparent}
              width={18}
              height={18}
            />
          }
          rightText="View all"
          style={styles.titleSectionHeader}
        />
        <Text style={styles.notFoundText}>No big loosers</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  searchBarStyle: {
    marginBottom: Theme.spacing.spacingL,
  },
  exploreSectionContainer: {
    marginBottom: Theme.spacing.spacing2XL,
  },
  titleSectionHeader: {
    marginBottom: Theme.spacing.spacingXS,
    paddingHorizontal: Theme.spacing.spacingM,
  },
  notFoundText: {
    ...Theme.typography.text.h6,
    ...Theme.typography.weight.light,
    alignSelf: 'center',
    marginBottom: Theme.spacing.spacingL,
    marginTop: Theme.spacing.spacing2XS,
  },
});

export default Explore;
