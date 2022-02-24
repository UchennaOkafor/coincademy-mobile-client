import { User } from 'firebase/auth';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Clock} from 'react-native-feather';
import {Theme} from 'styles/Index';
import Avatar from './Avatar';
import * as timeago from 'timeago.js';

interface Props {
  user: User | null;
}

const ProfileCard = (props: Props): JSX.Element => {
  const dateCreated = timeago.format(props.user?.metadata.creationTime ?? new Date());

  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.name}>{props.user?.displayName}</Text>
        <View style={styles.joinedContainer}>
          <Clock
            stroke={Theme.colors.grayDark}
            fill={Theme.colors.transparent}
            width={16}
            height={16}
          />
          <Text style={styles.joinedText}>Joined {dateCreated}</Text>
        </View>
      </View>
      <Avatar 
        user={props.user} 
        size={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: Theme.spacing.spacing2XS,
    marginBottom: Theme.spacing.spacingM,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    ...Theme.typography.text.h3
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
