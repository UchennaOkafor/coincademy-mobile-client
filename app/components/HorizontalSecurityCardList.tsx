import Security from 'models/Security';
import React from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import SecurityCardSmall from './SecurityCardSmall';

interface Props {
  style?: StyleProp<ViewStyle>;
  cardStyle: StyleProp<ViewStyle>;
  contentContainertStyle?: StyleProp<ViewStyle>;
  securities: Security[];
  loading: boolean;
  loadingComponent: JSX.Element;
  emptyComponent: JSX.Element;
  onPress: (security: Security) => void;
}

const HorizontalSecurityCardList = (props: Props): JSX.Element => {
  return (
    <View style={props.style}>
      {props.loading ? (
        props.loadingComponent
      ) : (
        <>
          {props.securities == null || props.securities.length === 0 ? (
            props.emptyComponent
          ) : (
            <>
              <ScrollView
                horizontal={true}
                contentContainerStyle={props.contentContainertStyle}
                showsHorizontalScrollIndicator={false}>
                {props.securities.map((item: Security, index: number) => (
                  <SecurityCardSmall
                    key={item.ticker}
                    security={item}
                    badge={`#${index + 1}`}
                    style={props.cardStyle}
                    onPress={() => props.onPress(item)}
                  />
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default HorizontalSecurityCardList;
