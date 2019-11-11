import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import theme from '../../theme/index';

interface HomeStyles {
  container: ViewStyle;
  text: ViewStyle;
  largeButton: ViewStyle;
  mediumButton: ViewStyle;
  smallButton: ViewStyle;
  largeText: ViewStyle;
  mediumText: ViewStyle;
  smallText: ViewStyle;
  whiteText: TextStyle;
  blackText: TextStyle;
}

export default StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 30,
  },
  largeButton: {
    height: 70,
    maxHeight: 70,
  },
  mediumButton: {
    height: 60,
    maxHeight: 60,
  },
  smallButton: {
    height: 50,
    maxHeight: 50,
  },
  largeText: {
    fontSize: 30,
  },
  mediumText: {
    fontSize: 26,
  },
  smallText: {
    fontSize: 22,
  },
  whiteText: {
    color: 'white',
  },
  blackText: {
    color: 'rgba(0, 0, 0, .87)',
  },
});
