import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Theme } from 'styles/Index';

interface Props {
  useScrollView: boolean;
  onPress?: () => void;
}

const PriceChangeFilter = (props: Props): JSX.Element => {
  const [activePillIndex, setActivePillIndex] = useState(0);

  return (
    <View>
      {props.useScrollView ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.scrollViewContainer}>
          {renderPills(['1H', '1D', '1W', '1M', '1Y'])}
        </ScrollView>
      ) : (
        <View style={styles.viewContainer}>
          {renderPills(['1H', '1D', '1W', '1M', '1Y'])}
        </View>
      )}
    </View>
  );

  function renderPills(items: string[]) {
    return (
      <>
        {items.map((value: string, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActivePillIndex(index)}>
            <Text
              style={[
                styles.pill,
                activePillIndex === index ? styles.activePill : null,
              ]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingVertical: Theme.spacing.spacingS,
  },
  viewContainer: {
    flexDirection: 'row',
    paddingVertical: Theme.spacing.spacingS,
    justifyContent: 'space-evenly',
  },
  pill: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.medium,
    paddingVertical: Theme.spacing.spacing3XS,
    paddingHorizontal: Theme.spacing.spacingS,
    marginHorizontal: Theme.spacing.spacingXS,
  },
  activePill: {
    backgroundColor: Theme.colors.blue,
    borderRadius: Theme.radius.large,
    color: Theme.colors.white,
  },
});

export default PriceChangeFilter;
