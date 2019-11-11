/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image } from 'react-native';
import styles from './styles';
import assets from './assets';
import CTButton from '../../components/CTButton';
import STTextButton from '../../components/CTTextButton';
import { NavigationFunction } from '../../../App';


interface Props  {
  navigate: NavigationFunction;
  correct: number;
  questions: number;
  longestStreak: number;
}

interface State {
}

class EndQuiz extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  public render() {

    const {
      correct,
      questions,
    } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <Text style={styles.headline}>
            {
              (correct === questions) ? (
                'You Aced It!'
              ) : (correct/questions > .8) ? (
                'You\'re Gold!'
              ) : (correct/questions > .7) ? (
                'You Did Good!'
              ) : (correct/questions > .5) ? (
                'You Did O.K.'
              ) : (
                'Not Your Round!'
              )
            }
          </Text>
          <Text style={styles.scoreEmoji}>
            {
              (correct === questions) ? (
                '🏆'
              ) : (correct/questions > .8) ? (
                '🥇'
              ) : (correct/questions > .7) ? (
                '🥈'
              ) : (correct/questions > .5) ? (
                '🆗'
              ) : (
                '🙈'
              )
            }
          </Text>
          <Text style={styles.subtext}>
            Correct: {this.props.correct} of {this.props.questions}
          </Text>
          <Text style={styles.subtext}>
            Longest Streak: {this.props.longestStreak}
          </Text>
          <View style={styles.padder} />
          <View style={styles.buttonContainer}>
            <STTextButton
              handlePress={() => this.props.navigate('quiz-controller', {})}
              size="medium"
            >
              Play Again
            </STTextButton>
          </View>
          <View style={styles.buttonContainer}>
            <STTextButton
              handlePress={() => this.props.navigate('home', {})}
              size="medium"
              color="green"
            >
              Main Menu
            </STTextButton>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default EndQuiz;
