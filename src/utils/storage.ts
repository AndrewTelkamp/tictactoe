import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKey} from '../enums';

export async function saveToStorage(data: any, storageKey: StorageKey) {
  const stringifiedState = JSON.stringify(data);

  try {
    await AsyncStorage.setItem(storageKey, stringifiedState);
  } catch (err) {
    return err;
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
    return err;
  }
}

export async function clearStorage(storageKey: StorageKey) {
  try {
    const clearStorage = await AsyncStorage.removeItem(storageKey);

    return {
      error: false,
      errorMessage: '',
    };
  } catch (err) {
    return {
      error: true,
      errorMessage: err,
    };
  }
}
