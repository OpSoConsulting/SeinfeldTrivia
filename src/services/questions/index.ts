import * as topicsService from '../topics';
import Prismic from 'prismic-javascript';
import { PrismicResponse, PrismicQuestion } from './types';
import constants from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import * as utils from '../../utils';

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

export async function getQuestions() {
  if (questions.length === 0) {
    await fetchQuestionsFromRemote();
  }

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

  const kidsMode = topicsService.getKidsMode();

  const excludedTopics = await topicsService.getExcludedTopics();

  const questionSet: PrismicQuestion[] = [];
  let questionIndex = 0;

  // loop until created a full set
  while(questionSet.length < numberOfQuestions) {
    const question = questions[questionIndex];

    // if there's no more questions, return what we have
    if (question === undefined) return questionSet;

    // check if question is eligible
    if (isEligibleQuestion({ question, answeredQuestions, kidsMode, excludedTopics })) {
      questionSet.push(question);
    }
    questionIndex += 1;
  }

  return utils.shuffle(questionSet);
}

interface IsEligibleQuestion {
  question: PrismicQuestion;
  answeredQuestions: string[];
  kidsMode: boolean;
  excludedTopics: string[];
}

function isEligibleQuestion({ 
  question, 
  answeredQuestions, 
  kidsMode,
  excludedTopics,
}: IsEligibleQuestion) {
  return (
    !answeredQuestions.includes(question.id)
    && (!kidsMode || question.data.tags.map(t => t.tag).includes('kids'))
    && excludedTopics.filter(t => question.data.tags.map(t => t.tag).includes(t)).length === 0
  );
}



export async function clearAnsweredQuestions() {

  await AsyncStorage.setItem(
    constants.ANSWERED_QUESTIONS_STORAGE_KEY,
    JSON.stringify([]),
  );
  answeredQuestions = [];
}