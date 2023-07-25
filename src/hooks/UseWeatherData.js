import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { fetchCurrentWeather, fetchFiveDaysWeatherForecast } from "../Api/Api";
import {
  groupWeatherByDay,
  convertUnixTimestampToTime,
} from "../utils/DateHelper";
import { getLocationAsync } from "../utils/LocationHelper";
import {
  WEATHER_DATA_KEY,
  FAVORITE_LOCATIONS_KEY,
} from "../constants/Constants";
import {
  getDataFromCache,
  saveDataToCache,
} from "../localStorage/LocalStorageManager";
import Toast from "react-native-toast-message";

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  const getWeatherDataByLocation = async () => {
    try {
      setIsLoading(true);

      const cachedWeatherData = await getDataFromCache(WEATHER_DATA_KEY);
      if (cachedWeatherData) {
        setWeatherData(JSON.parse(cachedWeatherData));
        setIsLoading(false);
      }

      const coordinatesResults = await getLocationAsync();
      const currentWeatherData = await fetchCurrentWeather({
        lat: coordinatesResults?.latitude,
        lon: coordinatesResults?.longitude,
      });
      const fiveDaysForecastData = await fetchFiveDaysWeatherForecast({
        lat: coordinatesResults?.latitude,
        lon: coordinatesResults?.longitude,
      });

      if (!currentWeatherData || !fiveDaysForecastData) {
        return;
      }

      const weatherList = fiveDaysForecastData?.list;
      const groupedWeatherData = groupWeatherByDay(weatherList);

      const freshWeatherData = {
        feelsLike: currentWeatherData?.main?.feels_like,
        humidity: currentWeatherData?.main?.humidity,
        pressure: currentWeatherData?.main?.pressure,
        name: currentWeatherData?.name,
        lat: currentWeatherData?.coord?.lat,
        long: currentWeatherData?.coord?.lon,
        weatherDescription: currentWeatherData?.weather[0]?.description,
        weatherType: currentWeatherData?.weather[0]?.main,
        windDegree: currentWeatherData?.wind?.deg,
        windSpeed: currentWeatherData?.wind?.speed,
        sunriseTime: convertUnixTimestampToTime(
          currentWeatherData?.sys?.sunrise
        ),
        sunSetTime: convertUnixTimestampToTime(currentWeatherData?.sys?.sunset),
        currentTemperature: currentWeatherData?.main?.temp,
        minimumPossibleTemperature: currentWeatherData?.main?.temp_min,
        maximumPossibleTemperature: currentWeatherData?.main?.temp_max,
        days: groupedWeatherData,
      };

      setWeatherData(freshWeatherData);

      await saveDataToCache(WEATHER_DATA_KEY, JSON.stringify(freshWeatherData));
    } catch (error) {
      Alert.alert("Error getting Weather data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavoriteLocationsToStorage = async (locations) => {
    try {
      await saveDataToCache(FAVORITE_LOCATIONS_KEY, JSON.stringify(locations));
    } catch (error) {
      // Handle error
      console.error("Error saving favorite locations to storage:", error);
    }
  };

  const addFavoriteLocation = (location) => {
    if (
      !favoriteLocations.some(
        (favLocation) =>
          favLocation.lat === location.lat && favLocation.lon === location.lon
      )
    ) {
      const updatedLocations = [...favoriteLocations, location];
      setFavoriteLocations(updatedLocations);
      saveFavoriteLocationsToStorage(updatedLocations);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `${location?.name} is successfully saved!`,
        position: "bottom",
        autoHide: true,
        visibilityTime: 2500,
      });
    }
  };

  const removeFavoriteLocation = (location) => {
    const updatedLocations = favoriteLocations.filter(
      (favLocation) =>
        !(favLocation.lat === location.lat && favLocation.lon === location.lon)
    );
    setFavoriteLocations(updatedLocations);
    saveFavoriteLocationsToStorage(updatedLocations);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: `${location?.name} is successfully removed!`,
      position: "bottom",
      autoHide: true,
      visibilityTime: 2500,
    });
  };
  const loadFavoriteLocationsFromStorage = async () => {
    try {
      const locationsJSON = await getDataFromCache(FAVORITE_LOCATIONS_KEY);
      if (locationsJSON) {
        const locations = JSON.parse(locationsJSON);
        setFavoriteLocations(locations);
      }
    } catch (error) {
      // Handle error
      console.error("Error loading favorite locations from storage:", error);
    }
  };

  useEffect(() => {
    getWeatherDataByLocation();
    loadFavoriteLocationsFromStorage();
  }, []);

  return {
    weatherData,
    isLoading,
    favoriteLocations,
    fetchWeather: getWeatherDataByLocation,
    loadFavoriteLocationsFromStorage,
    addFavoriteLocation,
    removeFavoriteLocation,
  };
};

export default useWeatherData;
