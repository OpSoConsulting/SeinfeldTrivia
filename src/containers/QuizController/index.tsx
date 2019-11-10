/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import STTextButton from '../../components/STTextButton';
import { Question, PrismicQuestion, PrismicResponse } from './types';
import { NavigationFunction } from '../../../App';
import questions from './questions';
import constants from '../../constants';
import Prismic from 'prismic-javascript';


interface Props  {
  navigate: NavigationFunction;
}

interface State {
  questions?: PrismicQuestion[];
  currentQuestionIndex: number;
  response?: number;
  streak: number;
  correct: number;
  longestStreak: number;
}

class QuizController extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      currentQuestionIndex: 0,
      streak: 0,
      correct: 0,
      longestStreak: 0,
    };
  }

  async componentDidMount() {
    const client = Prismic.client(constants.PRISMIC_API_ENDPOINT);

    const response: PrismicResponse = await client.query(
      Prismic.Predicates.at('document.type', 'question'),
      {}
    )

    this.setState({ questions: response.results })
  }

  getCorrectAnswerIndex() {
    const {
      questions,
      currentQuestionIndex,
    } = this.state;

    if (!questions) return;

    const question = questions[currentQuestionIndex];

    for (let i = 0; i < question.data.answers.length; i += 1) {
      if (question.data.answers[i].is_correct === 'true') return i;
    }
  }

  handleAnswerPress(response: number) {

    if (this.state.response) return;

    const answeredCorrectly = response === this.getCorrectAnswerIndex();

    let update = {};

    if (answeredCorrectly) {
      update = {
        streak: this.state.streak + 1,
        longestStreak: (
          this.state.longestStreak < this.state.streak + 1 
            ? this.state.streak + 1 
            : this.state.longestStreak
        ),
        correct: this.state.correct + 1,
      }
    } else {
      update = {
        streak: 0,
      }
    }


    this.setState({
      response,
      ...update,
    });
  }

  incrementQuestion() {
    const {
      questions,
      correct,
      longestStreak,
    } = this.state;

    if (!questions) return;
    if (this.state.currentQuestionIndex < questions.length - 1) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1,
        response: undefined,
      });
      return;
    }

    this.props.navigate(
      'end-quiz', 
      { 
        questions: questions.length,
        correct,
        longestStreak,
      },
    )
  }

  public render() {

    const {
      questions,
      currentQuestionIndex,
      response,
      streak,
    } = this.state;

    if (!questions) return (
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>
            Loading questions
          </Text>
        </View>
      </SafeAreaView>
    );

    const question = questions[currentQuestionIndex];
    const answered = response !== undefined;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.padding}>
          <View style={styles.topRow}>
            <View style={styles.leftColumn}>
              <Text style={styles.topRowText}>
                ⚡ Streak: {streak}
              </Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.topRowText}>
                💬 Question: {currentQuestionIndex + 1} of {questions.length}
              </Text>
            </View>
          </View>
          <View
            style={styles.questionTileContainer}
          >
            <ScrollView 
              style={styles.questionTile}
              contentContainerStyle={styles.questionTileContentContainer}
            >
              <Text style={styles.question}>
                {question.data.question_text[0].text}
              </Text>
            </ScrollView>
          </View>
          <View style={styles.answersContainer}>
            {
              question.data.answers.map((answer, i) => (
                <View 
                  key={answer.text[0].text}
                  style={styles.buttonContainer}
                >
                  <STTextButton
                    handlePress={() => this.handleAnswerPress(i)}
                    color={(
                      answered ? (
                        answer.is_correct === 'true' ? 'green' : (
                          i === response ? 'red': 'white'
                        ) 
                      ) : 'white'
                    )}
                  >
                    <Text style={styles.answerText}>
                      {answer.text[0].text}
                    </Text>
                  </STTextButton>
                </View>
              ))
            }
          </View>
          <View style={styles.spacer} />
          {
            answered && (
              <View style={styles.bottomButtonRow}>
                <STTextButton
                  handlePress={() => this.incrementQuestion()}
                  size="small"
                >
                  Next
                </STTextButton>
              </View>
            )
          }
        </View>
      </SafeAreaView>
    );
  }
}

export default QuizController;
