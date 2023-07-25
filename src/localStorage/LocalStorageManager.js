import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const saveDataToCache = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    Alert.alert("Error saving data: ", error);
  }
};

export const getDataFromCache = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      console.log("No data found for the given key:", key);
      return null;
    }
  } catch (error) {
    Alert.alert("Error retrieving data:", error);
    return null;
  }
};

export const removeDataFromCache = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing data:", error);
  }
};
