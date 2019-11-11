/* tslint:disable:max-line-length */
import React from 'react';
import { View, SafeAreaView, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import styles from './styles';
import STTextButton from '../../components/CTTextButton';
import { NavigationFunction } from '../../../App';
import * as questionsService from '../../services/questions';
import { PrismicQuestion, PrismicAnswer } from '../../services/questions/types';
import * as utils from '../../utils';


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
  loading: boolean;
}

class QuizController extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      currentQuestionIndex: 0,
      streak: 0,
      correct: 0,
      longestStreak: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    await this.loadQuestionSet();
  }

  async loadQuestionSet() {

    try {
      const questions = await questionsService.getQuestionSet({ numberOfQuestions: 10 });

      this.setState({ questions: this.shuffleAnswers(questions) })
    } catch (err) {
      this.props.navigate('error', {});
    }

  }

  shuffleAnswers(questions: PrismicQuestion[]): PrismicQuestion[] {
    return questions
        .map(q => {
          const shuffledAnswers = utils.shuffle(q.data.answers
              .map((a, i) => ({ ...a, originalIndex: i }))
          );

          return {
            ...q,
            data: {
              ...q.data,
              answers: shuffledAnswers,
            }
          }
        });
  }

  async clearResponses() {
    this.setState({ loading: true });
    try {
      await questionsService.clearAnsweredQuestions();

      await this.loadQuestionSet();
    } catch (err) {
      this.props.navigate('error', {});
    }
    this.setState({ loading: false });
  }

  getCorrectAnswerIndex(answers: PrismicAnswer[]) {

    for (let i = 0; i < answers.length; i += 1) {
      if (answers[i].is_correct === 'true') return i;
    }
  }

  handleAnswerPress(response: number, answers: PrismicAnswer[]) {

    if (this.state.response !== undefined || !this.state.questions) return;

    const question = this.state.questions[this.state.currentQuestionIndex];

    const answeredCorrectly = response === this.getCorrectAnswerIndex(answers);
    questionsService.addAnsweredQuestion(question.id)

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


    if (questions.length === 0) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.padding}>
            <Text style={styles.noQuestionsLeftHeader}>
              You've answered all our questions!
            </Text>
            <Text style={styles.noQuestionsLeftSubheader}>
              Check back in later to see if we've added more, or tap to add all the questions back.
            </Text>
            {
              (this.state.loading) && (
                <>
                  <ActivityIndicator />
                  <Text style={styles.noQuestionsLeftSubheader}>
                    Clearing responses and reloading questions.
                  </Text>
                </>
              )
            }
            <View style={styles.spacer} />
            <View style={styles.bottomButtonRow}>
              <View style={styles.buttonContainer}>
                <STTextButton
                  handlePress={() => this.clearResponses()}
                  size="small"
                >
                  Clear Responses
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
          </View>
        </SafeAreaView>
      )
    }

    const question = questions[currentQuestionIndex];
    const answered = response !== undefined;

    const answers = question.data.answers;

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
              answers.map((answer, i) => (
                <View 
                  key={answer.text[0].text}
                  style={styles.buttonContainer}
                >
                  <STTextButton
                    handlePress={() => this.handleAnswerPress(i, answers)}
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
