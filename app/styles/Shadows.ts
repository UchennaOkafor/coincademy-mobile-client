import {StyleSheet} from 'react-native';
import { Colors } from './Colors';

export const Shadows = StyleSheet.create({
  small: {
    shadowColor: Colors.grayDark,
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 0.5,
  },
  normal: {
    elevation: 1.5
  },
  medium: {
    elevation: 2
  }
});
