import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Clock} from 'react-native-feather';
import {Theme} from 'styles/Index';
import Avatar from './Avatar';
import * as timeago from 'timeago.js';

interface Props {
  displayName: string;
  createdAt: number;
}

const ProfileCard = (props: Props): JSX.Element => {
  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.name}>{props.displayName}</Text>
        <View style={styles.joinedContainer}>
          <Clock
            stroke={Theme.colors.grayDark}
            fill={Theme.colors.transparent}
            width={16}
            height={16}
          />
          <Text style={styles.joinedText}>Joined {timeago.format(props.createdAt)}</Text>
        </View>
      </View>
      <Avatar 
        user={null} 
        size={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginBottom: Theme.spacing.spacingM,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    ...Theme.typography.text.h2,
    ...Theme.typography.weight.extraBold
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.spacingXS
  },
  joinedText: {
    ...Theme.typography.text.h7,
    ...Theme.typography.weight.medium,
    color: Theme.colors.grayDark,
    marginLeft: Theme.spacing.spacingXS
  }
});

export default ProfileCard;
