import { StyleSheet, ViewStyle } from 'react-native';
import theme from '../../theme/index';

interface HomeStyles {
  container: ViewStyle;
  yellow: ViewStyle;
  white: ViewStyle;
  green: ViewStyle;
  red: ViewStyle;
}

export default StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  yellow: {
    backgroundColor: theme.colors.yellow,
    shadowColor: theme.colors.yellowShade,
  },
  white: {
    backgroundColor: 'white',
    shadowColor: theme.colors.gray,
  },
  green: {
    backgroundColor: theme.colors.green,
    shadowColor: theme.colors.greenShade,
  },
  red: {
    backgroundColor: theme.colors.red,
    shadowColor: theme.colors.redShade,
  },
});
