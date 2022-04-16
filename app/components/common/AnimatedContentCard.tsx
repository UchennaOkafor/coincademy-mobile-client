import Spacer from 'components/common/Spacer';
import LottieView from 'components/lottie/LottieView';
import { MotiView } from 'moti';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from 'styles/Index';

interface Props {
  loading: boolean;
  title: string;
  subtitle: string;
  source: string | any | { uri: string };
}

const AnimatedContentCard = (props: Props): JSX.Element => {
  return (
    <MotiView 
      animate={{ opacity: props.loading ? 1 : 0 }} 
      style={styles.container}>
      <LottieView
        source={props.source}
        autoPlay={true}
        speed={1.25}
        style={{width: 160, height: 160}}
      />
      <Text style={styles.title}>
        {props.title}
      </Text>
      <Spacer vertical={Theme.spacing.spacingXS} />
      <Text style={styles.subtitle}>
        {props.subtitle}
      </Text>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    ...Theme.typography.text.h2, 
    color: Theme.colors.grayDark
  },
  subtitle: {
    ...Theme.typography.text.body, 
    color: Theme.colors.gray
  }
});

export default AnimatedContentCard;
