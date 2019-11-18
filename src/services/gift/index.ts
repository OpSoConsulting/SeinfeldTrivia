import AsyncStorage from "@react-native-community/async-storage";
import constants from "../../constants";

let giftsMade: string[] = [];

export async function getGiftsMade() {
  if (giftsMade.length !== 0) {
    return giftsMade;
  }

  const stringValue = await AsyncStorage.getItem(constants.EXCLUDED_TOPICS_STORAGE_KEY);
  if (stringValue === null) {
    return [];
  }
  giftsMade = JSON.parse(stringValue);

  return giftsMade;
}

export async function addGiftMade(gift: string) {
  if (giftsMade.length === 0) {
    await getGiftsMade();
  }

  giftsMade = [...giftsMade, gift];
  await AsyncStorage.setItem(
    constants.GIFTS_MADE_STORAGE_KEY,
    JSON.stringify(giftsMade),
  );
}