import { StyleSheet, TextStyle, ViewStyle, Platform, ImageStyle } from 'react-native';
import theme from '../../theme/index';

interface HomeStyles {
  container: ViewStyle;
  headline: TextStyle;
  imageContainer: ViewStyle;
  festivusPole: ImageStyle;
  buttonContainer: ViewStyle;
  bottomPadder: ViewStyle;
}

export default StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: theme.colors.blue,
    alignItems: 'center',
  },
  headline: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 42,
    textAlign: 'center',
    marginTop: 24,
  },
  imageContainer: {
    flex: 1,
    marginTop: 40,
    marginBottom: 40,
  },
  festivusPole: {
    height: '100%',
    maxHeight: 300,
    resizeMode: 'contain'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomPadder: {
    height: 20,
  }
});
