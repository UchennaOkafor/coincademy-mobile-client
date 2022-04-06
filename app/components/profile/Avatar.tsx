import { User } from 'firebase/auth';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ImageStyle,
  TextStyle
} from 'react-native';
import { User as UserIcon } from 'react-native-feather';
import {Theme} from 'styles/Index';

interface Props {
  user: User | null;
  size: number;
}

const Avatar = (props: Props): JSX.Element => {
  const avatarStyle: StyleProp<ImageStyle> = {
    width: props.size,
    height: props.size,
    borderRadius: props.size / 2
  };

  const initialsStyle: StyleProp<TextStyle> = {
    fontSize: props.size / 2.3
  };

  return (
    <>
      {props.user == null ? (
        <>
          <View style={[styles.initialsContainer, avatarStyle]}>
            <UserIcon
              stroke={Theme.colors.grayDark900}
              strokeWidth={2.25}
              width={props.size / 2}
              height={props.size / 2}
            />
          </View>
        </>
      ) : (
        <>
          {props.user?.photoURL == null ? (
            <View style={[styles.initialsContainer, avatarStyle]}>
              <Text style={[styles.initialsText, initialsStyle]}>{getInitials(props.user?.displayName)}</Text>
            </View>
          ) : (
            <Image source={{ uri: props.user?.photoURL }} style={avatarStyle} />
          )}
        </>
      )}
    </>
  );

  function getInitials(name?: string | null): string {
    return name?.split('')[0]?.charAt(0) ?? '?';
  }
};

const styles = StyleSheet.create({
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.purpleLight
  },
  initialsText: {
    ...Theme.typography.text.h3
  }
});

export default Avatar;
