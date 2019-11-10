import { StyleSheet, TextStyle, ViewStyle, Platform, ImageStyle } from 'react-native';
import theme from '../../theme/index';

interface HomeStyles {
  container: ViewStyle;
  padding: ViewStyle;
  headline: TextStyle;
  subtext: TextStyle;
  scoreEmoji: TextStyle;
  buttonContainer: ViewStyle;
  padder: ViewStyle;
}

export default StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: theme.colors.blue,
  },
  padding: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 42,
    textAlign: 'center',
    marginTop: 24,
  },
  scoreEmoji: {
    marginTop: 40,
    marginBottom: 40,
    fontSize: 52,
  },
  subtext: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  padder: {
    flex: 1,
  }
});
