import { StyleSheet, TextStyle, ViewStyle, Platform, ImageStyle } from 'react-native';
import theme from '../../theme/index';

interface HomeStyles {
  container: ViewStyle;
  padding: ViewStyle;
  spacer: ViewStyle;
  topRow: ViewStyle;
  settingsIcon: ImageStyle;
  headline: TextStyle;
  imageContainer: ViewStyle;
  homeImage: ImageStyle;
  buttonContainer: ViewStyle;
}

export default StyleSheet.create<HomeStyles>({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: theme.colors.blue,
    alignItems: 'stretch',
  },
  topRow: {
    flexDirection: 'row',
  },
  spacer: {
    flex: 1,
  },
  settingsIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  padding: {
    flex: 1,
    padding: 20,
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
    justifyContent: 'center',
  },
  homeImage: {
    height: '100%',
    maxHeight: 300,
    resizeMode: 'contain'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
});
