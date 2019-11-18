import { StyleSheet, TextStyle, ViewStyle, Platform, ImageStyle } from 'react-native';
import theme from '../../theme/index';

interface HomeStyles {
  container: ViewStyle;
  padding: ViewStyle;
  padder: ViewStyle;
  header: TextStyle;
  subheader: TextStyle;
  imageContainer: ViewStyle;
  homeImage: ImageStyle;
  buttonContainer: ViewStyle;
  bottomPadder: ViewStyle;
}

export default StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: theme.colors.blue,
    alignItems: 'stretch',
  },
  padding: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 24,
  },
  subheader: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  imageContainer: {
    // flex: 1,
    justifyContent: 'center',
    height: 100,
    marginTop: 40,
    marginBottom: 40,
  },
  homeImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  padder: { 
    flex: 1 
  },
  buttonContainer: {
    // flex: 1,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomPadder: {
    height: 20,
  }
});
