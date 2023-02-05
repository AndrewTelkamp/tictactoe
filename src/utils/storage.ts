import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKey} from '../enums';

export async function saveToStorage(data: any, storageKey: StorageKey) {
  const stringifiedState = JSON.stringify(data);

  try {
    await AsyncStorage.setItem(storageKey, stringifiedState);
    console.log(`${storageKey} data stored successfully!`);
  } catch (err) {
    console.log(`Unable to store $${storageKey} data`, err);
  }
}

export async function getFromStorage(storageKey: StorageKey) {
  try {
    const storedStr = await AsyncStorage.getItem(storageKey);
    let stored = null;

    if (typeof storedStr === 'string') {
      stored = JSON.parse(storedStr);
    }

    return stored;
  } catch (err) {
    console.log(`Unable to retrieve ${storageKey} data`, err);
  }
}

export async function clearStorage(storageKey: StorageKey) {
  try {
    const clearStorage = await AsyncStorage.removeItem(storageKey);
    console.log(`${storageKey} cleared successfully.`);

    return {
      error: false,
      errorMessage: '',
    };
  } catch (err) {
    console.log(`Unable to clear ${storageKey} storage`, err);

    return {
      error: true,
      errorMessage: err,
    };
  }
}
