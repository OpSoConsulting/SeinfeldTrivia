import AsyncStorage from '@react-native-community/async-storage';
import constants from '../../constants';

let excludedTopics: string[] = [];
let kidsMode: boolean = false;

export async function getExcludedTopics() {
  if (excludedTopics.length !== 0) {
    return excludedTopics;
  }
  const stringValue = await AsyncStorage.getItem(constants.EXCLUDED_TOPICS_STORAGE_KEY);
  if (stringValue === null) {
    return [];
  }
  excludedTopics = JSON.parse(stringValue);
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

export function getKidsMode() {
  return kidsMode;
}

export function toggleKidsMode() {
  kidsMode = !kidsMode;
}