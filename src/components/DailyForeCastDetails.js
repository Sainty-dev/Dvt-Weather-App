import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { WEATHER_ICONS } from "../constants/Constants";

const DailyForeCastDetails = ({ day, iconName, temperature }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{day}</Text>
      <Image style={styles.image} source={WEATHER_ICONS[iconName] ?? WEATHER_ICONS['Clear']} />
      <Text style={styles.text}>{temperature}&#176;</Text>
    </View>
  );
};

export default DailyForeCastDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    flexWrap: "wrap",
    height: 50,
    marginBottom: 10,
  },
  imageContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  text: {
    color: "#ffffff",
    fontWeight: "400",
  },
});
