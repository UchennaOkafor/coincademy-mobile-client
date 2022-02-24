import { User } from 'firebase/auth';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ChevronRight} from 'react-native-feather';
import {Theme} from 'styles/Index';
import Avatar from './Avatar';

interface Props {
  user: User | null;
  onPress: () => void;
}

const HorizontalProfileCard = (props: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.innerContainer}>
        <Avatar user={props.user} size={50} />
        <View style={styles.profileContainer}>
          <Text style={styles.name}>{props.user?.displayName}</Text>
          <Text style={styles.joinedText}>View Profile</Text>
        </View>
      </View>
      <ChevronRight
        stroke={Theme.colors.black}
        width={24}
        height={24}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.spacing2XS,
    marginBottom: Theme.spacing.spacingM,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  innerContainer: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  profileContainer: {
    marginLeft: Theme.spacing.spacingM,
  },
  name: {
    ...Theme.typography.text.h4
  },
  joinedText: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.medium,
    color: Theme.colors.grayDark,
    marginTop: Theme.spacing.spacing2XS + Theme.spacing.spacing3XS
  }
});

export default HorizontalProfileCard;
