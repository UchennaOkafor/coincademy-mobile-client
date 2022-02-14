import {StyleSheet} from 'react-native';
import {Colors} from './Colors';

//TODO add fontSize by doing Theme.typography.text.fs6
//TODO call this Typography

export const weight = StyleSheet.create({
  black: {
    fontFamily: 'Inter-Black'
  },
  extraBold: {
    fontFamily: 'Inter-ExtraBold'
  },
  bold: {
    fontFamily: 'Inter-Bold'
  },
  semiBold: {
    fontFamily: 'Inter-SemiBold'
  },
  medium: {
    fontFamily: 'Inter-Medium'
  },
  normal: {
    fontFamily: 'Inter-Regular'
  },
  light: {
    fontFamily: 'Inter-Light',
    fontWeight: '100'
  }
});

export const text = StyleSheet.create({
  fs1: {},

  h1: {
    color: Colors.black,
    fontSize: 30,
    fontFamily: 'Inter-Bold'
  },
  h2: {
    fontSize: 25,
    color: Colors.black,
    fontFamily: 'Inter-Bold'
  },
  h3: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: Colors.black
  },
  h4: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.black
  },
  h5: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.black
  },
  h6: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.black
  },
  h7: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    color: Colors.black
  },
  h8: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.black
  },
  body: {
    color: Colors.grayDark,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: 20
  },
  tabBarFooter: {
    fontSize: 11.5,
    fontFamily: 'Inter-Medium'
  },
  tabBarHeader: {
    fontSize: 18,
    fontFamily: 'Inter-Medium'
  }
});
