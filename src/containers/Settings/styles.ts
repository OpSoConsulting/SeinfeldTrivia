import { StyleSheet, TextStyle, ViewStyle, Platform, ImageStyle } from 'react-native';
import theme from '../../theme/index';

interface HomeStyles {
  container: ViewStyle;
  padding: ViewStyle;
  scrollView: ViewStyle;
  header: TextStyle;
  kidsText: TextStyle;
  loadingText: TextStyle;
  padder: ViewStyle;
  kidsModeRow: ViewStyle;
  topicsContainer: ViewStyle;
  topicsRow: ViewStyle;
  topicTextContainer: ViewStyle;
  topicText: TextStyle;
  topicSwitchContainer: ViewStyle;
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
  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    flex: 1,
  },
  header: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 24,
  },
  kidsModeRow: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
  },
  padder: {
    flex: 1,
  },
  kidsText: {
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    fontSize: 18,
  },
  loadingText: {
    fontFamily: 'Montserrat-Medium',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  topicsContainer: {
    marginTop: 20,
    marginBottom: 20,
    maxWidth: '100%',
  },
  topicsRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    maxWidth: '100%',
    width: '100%',
  },
  topicTextContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  topicText: {
    fontFamily: 'Montserrat-Medium',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  topicSwitchContainer: {
    marginLeft: 25,
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
  },
  bottomPadder: {
    height: 20,
  }
});
