import React, {useCallback} from 'react';
import {
  FlatList,
  RefreshControlProps,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Security from '@models/Security';
import SecurityCard from './SecurityCard';
import CurrencyLocale from '@models/CurrencyLocale';
import { Theme } from 'styles/Index';

interface Props {
  maxLength: number;
  securities: Security[];
  locale: CurrencyLocale;
  contentContainerStyle?: StyleProp<ViewStyle>;
  headerComponent?: React.ComponentType<any> | React.ReactElement | null;
  footerComponent?: React.ComponentType<any> | React.ReactElement | null;
  onViewAllPressed: () => void;
  onPress: (security: Security) => void;
  refreshControl?: React.ReactElement<RefreshControlProps>;
}

const SecurityCardList = (props: Props): JSX.Element => {
  const showViewAll = props.securities.length > props.maxLength;
  const slicedSecurities = props.securities.slice(0, props.maxLength);

  const keyExtractor = useCallback((item: any) => item.ticker, []);
  const renderItem = useCallback(
    ({item}: {item: Security}) => (
      <SecurityCard
        key={item.ticker}
        security={item}
        locale={props.locale}
        onPress={() => props.onPress(item)}
      />
    ),
    [props.locale, props.onPress],
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={props.contentContainerStyle}
      initialNumToRender={8}
      data={slicedSecurities}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={props.refreshControl}
      ListHeaderComponent={props.headerComponent}
      ListFooterComponent={
        <>
          {showViewAll && (
            <TouchableOpacity
              onPress={props.onViewAllPressed}
              style={styles.viewAllContainer}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          )}
          {props.footerComponent}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  viewAllContainer: {
    alignSelf: 'stretch',
    paddingTop: Theme.spacing.spacing2XS,
    paddingBottom: Theme.spacing.spacingL,
  },
  viewAllText: {
    ...Theme.typography.text.h6,
    color: Theme.colors.red,
    alignSelf: 'center',
  },
});

export default SecurityCardList;
