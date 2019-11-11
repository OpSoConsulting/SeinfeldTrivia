import { StyleSheet, TextStyle, ViewStyle, Platform, ImageStyle } from 'react-native';
import theme from '../../theme/index';

interface HomeStyles {
  container: ViewStyle;
  padding: ViewStyle;
  topRow: ViewStyle;
  leftColumn: ViewStyle;
  rightColumn: ViewStyle;
  loadingText: TextStyle;
  noQuestionsLeftHeader: TextStyle;
  noQuestionsLeftSubheader: TextStyle;
  topRowText: TextStyle;
  questionTile: ViewStyle;
  questionTileContainer: ViewStyle;
  questionTileContentContainer: ViewStyle;
  question: TextStyle;
  answersContainer: ViewStyle;
  buttonContainer: ViewStyle;
  spacer: ViewStyle;
  answerText: TextStyle;
  bottomButtonRow: ViewStyle;
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
    padding: 10,
    paddingTop: 10,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  leftColumn: {

  },
  rightColumn: {
    textAlign: 'right',
    flex: 1,
    alignItems: 'flex-end',
  },
  loadingText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
  noQuestionsLeftHeader: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    fontSize: 34,
    marginTop: 20,
  },
  noQuestionsLeftSubheader: {
    marginTop: 20,
    color: 'white',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    fontSize: 18,
  },
  topRowText: {
    color: 'white',
    fontFamily: 'Montserrat-Medium',
  },
  questionTileContainer: {
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: theme.colors.gray,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  questionTile: {
    width: '100%',
    maxHeight: 200,
  },
  questionTileContentContainer: {
    padding: 20,
  },
  question: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    color: 'rgba(0, 0, 0, .87)',
    fontSize: 18,
  },
  answersContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 10,
    height: 50,
  },
  answerText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
  spacer: {
    flex: 1,
  },
  bottomButtonRow: {
    flex: 1,
    justifyContent: 'flex-end'
  },
});
