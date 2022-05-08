import React from 'react';
import {StyleSheet, View, Image, Text, TextStyle, StyleProp} from 'react-native';
import {Theme} from 'styles/Index';

interface Props {
  name: string;
  imageUrl: string;
  nameStyle?: StyleProp<TextStyle>
}

const TeamMember = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: props.imageUrl }}
      />
      <Text style={[styles.text, props.nameStyle]}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.spacingM
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.large,
    marginRight: Theme.spacing.spacingXS
  },
  text: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.medium,
    color: Theme.colors.grayDark,
  }
});

export default TeamMember;
