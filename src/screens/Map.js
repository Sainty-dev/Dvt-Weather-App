import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import HtmlMapRenderComponent from "../components/Map";
import WebView from "react-native-webview";
import { getLocationAsync } from "../utils/LocationHelper";
import useWeatherData from "../hooks/UseWeatherData";

const Map = ({ navigation }) => {
  const [coordinates, setCoordinates] = useState("");
  const { favoriteLocations, loadFavoriteLocationsFromStorage } =
    useWeatherData();

  const getCurrentLocation = async () => {
    const coordinatesResults = await getLocationAsync();
    setCoordinates(coordinatesResults);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCurrentLocation();
      loadFavoriteLocationsFromStorage();
    });
    return unsubscribe;
  }, [navigation]);

  const mapHtml = HtmlMapRenderComponent({
    center: [coordinates.latitude, coordinates.longitude],
    coordinates: { lat: coordinates.latitude, long: coordinates.longitude },
    target: { lat: 0, long: 0 },
    zoom: 10,
    places: favoriteLocations,
    from: [0, 0],
    to: [0, 0],
  });
  return <WebView source={{ html: mapHtml }} style={styles.mapContainer} />;
};

export default Map;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
