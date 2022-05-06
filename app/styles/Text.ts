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
  h1: {
    color: Colors.black,
    fontSize: 28,
    fontFamily: weight.black.fontFamily,
    letterSpacing: 0.2,
  },
  h2: {
    fontSize: 24,
    color: Colors.black,
    fontFamily: weight.bold.fontFamily,
    letterSpacing: 0.2,
  },
  h3: {
    fontFamily: weight.bold.fontFamily,
    fontSize: 22,
    color: Colors.black,
    letterSpacing: 0.2,
  },
  h4: {
    fontFamily: weight.bold.fontFamily,
    fontSize: 18,
    color: Colors.black,
    letterSpacing: 0.2,
  },
  h5: {
    fontFamily: weight.semiBold.fontFamily,
    fontSize: 16,
    color: Colors.black,
    letterSpacing: 0.2,
  },
  h6: {
    fontSize: 14,
    fontFamily: weight.semiBold.fontFamily,
    color: Colors.black,
    letterSpacing: 0.2,
  },
  h7: {
    fontSize: 13,
    fontFamily: weight.semiBold.fontFamily,
    color: Colors.black,
    letterSpacing: 0.2,
  },
  h8: {
    fontSize: 12,
    fontFamily: weight.semiBold.fontFamily,
    color: Colors.black,
    letterSpacing: 0.2,
  },
  body: {
    color: Colors.grayDark,
    fontSize: 16,
    fontFamily: weight.normal.fontFamily,
    letterSpacing: 0.25,
    lineHeight: 24
  },
  body2: {
    color: Colors.grayDark,
    fontSize: 14,
    fontFamily: weight.normal.fontFamily,
    letterSpacing: 0.24,
    lineHeight: 23
  },
  tabBarFooter: {
    fontSize: 11.5,
    fontFamily: weight.medium.fontFamily,
    letterSpacing: 0.2,
  },
  tabBarHeader: {
    fontSize: 18,
    fontFamily: weight.medium.fontFamily,
    letterSpacing: 0.2,
  }
});
