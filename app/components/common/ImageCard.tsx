import React from 'react';
import {View, Image, Text, StyleSheet, ImageSourcePropType} from 'react-native';
import {Theme} from 'styles/Index';
import Spacer from './Spacer';

interface Props {
  source?: ImageSourcePropType;
  title?: string;
  subtitle?: string;
}

const ImageCard = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {props.source && (
          <Image
            resizeMode="contain"
            style={styles.image}
            source={props.source}
          />
        )}
        <Spacer />
        <Text style={styles.title}>{props.title}</Text>
        <Spacer vertical={Theme.spacing.spacing3XS} />
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundGray,
  },
  innerContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: Theme.spacing.spacingL
  },
  title: {
    ...Theme.typography.text.h4, 
    ...Theme.typography.weight.semiBold
  },
  subtitle: {
    ...Theme.typography.text.h5, 
    ...Theme.typography.weight.normal, 
    color: Theme.colors.gray, 
    textAlign: 'center'
  },
  image: {
    width: 120, 
    height: 120
  }
});

export default ImageCard;
