import Prismic from 'prismic-javascript';
import { PrismicResponse, PrismicQuestion } from './types';
import constants from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';

let questions: PrismicQuestion[] = [];
let answeredQuestions: string[] = [];

export async function fetchQuestionsFromRemote() {
  const client = Prismic.client(constants.PRISMIC_API_ENDPOINT);

  const response: PrismicResponse = await client.query(
    Prismic.Predicates.at('document.type', 'question'),
    { pageSize: 100 }
  );

  questions = response.results;
  return questions;
}

export async function addAnsweredQuestion(questionId: string) {
  try {
    if (answeredQuestions.length === 0) {
      await getAnsweredQuestions();
    }

    answeredQuestions = [...answeredQuestions, questionId]
    await AsyncStorage.setItem(
      constants.ANSWERED_QUESTIONS_STORAGE_KEY,
      JSON.stringify(answeredQuestions),
    );
  } catch (err) {
    throw err;
  }
}

export async function getAnsweredQuestions() {
  try {
    const stringValue = await AsyncStorage.getItem(constants.ANSWERED_QUESTIONS_STORAGE_KEY);
    if (stringValue === null) {
      return [];
    }
    answeredQuestions = JSON.parse(stringValue);
    return JSON.parse(stringValue);
  } catch (err) {
    throw err;
  }
}

interface GetQuestionSet {
  numberOfQuestions: number;
}

export async function getQuestionSet({ numberOfQuestions }: GetQuestionSet) {
  if (questions.length === 0) {
    await fetchQuestionsFromRemote();
  }

  if (answeredQuestions.length === 0) {
    await getAnsweredQuestions();
  }

  const questionSet: PrismicQuestion[] = [];
  let questionIndex = 0;
  while(questionSet.length < numberOfQuestions) {
    const question = questions[questionIndex];
    if (question === undefined) return questionSet;
    if (!answeredQuestions.includes(question.id)) {
      questionSet.push(question);
    }
    questionIndex += 1;
  }

  return questionSet;
}

export async function clearAnsweredQuestions() {

  await AsyncStorage.setItem(
    constants.ANSWERED_QUESTIONS_STORAGE_KEY,
    JSON.stringify([]),
  );
  answeredQuestions = [];
}