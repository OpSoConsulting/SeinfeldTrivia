import AsyncStorage from '@react-native-community/async-storage';
import constants from '../../constants';
import * as questionsService from '../questions';

let excludedTopics: string[] = [];
let kidsMode: boolean = false;

export async function getExcludedTopics(): Promise<string[]> {
  if (excludedTopics.length !== 0) {
    return excludedTopics;
  }
  const stringValue = await AsyncStorage.getItem(constants.EXCLUDED_TOPICS_STORAGE_KEY);
  if (stringValue === null) {
    return [];
  }
  excludedTopics = JSON.parse(stringValue);

  return excludedTopics;
}

export async function addExcludedTopic(topic: string) {
  if (excludedTopics.length === 0) {
    await getExcludedTopics();
  }

  excludedTopics = [...excludedTopics, topic];
  await AsyncStorage.setItem(
    constants.EXCLUDED_TOPICS_STORAGE_KEY,
    JSON.stringify(excludedTopics),
  );
}

export async function removeExcludedTopic(topic: string) {
  if (excludedTopics.length === 0) {
    await getExcludedTopics();
  }

  excludedTopics = excludedTopics.filter(t => t !== topic);
  await AsyncStorage.setItem(
    constants.EXCLUDED_TOPICS_STORAGE_KEY,
    JSON.stringify(excludedTopics),
  );
}

export async function getAllTopics(): Promise<string[]> {
  const questions = await questionsService.getQuestions();

  let topics: string[] = [];

  for (let i = 0; i < questions.length; i += 1) {
    topics = [...topics, ...questions[i].data.tags.map(t => t.tag)];
  }

  return topics.filter((t, i, arr) => i === arr.indexOf(t));
}


export function getKidsMode() {
  return kidsMode;
}

export function toggleKidsMode() {
  kidsMode = !kidsMode;
}
