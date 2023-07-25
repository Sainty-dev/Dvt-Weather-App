import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const SunriseAndSunsetSection = ({ sunriseTime, sunSetTime }) => {
  return (
    <View style={styles?.container}>
      <Text style={styles.headerText}>Sunrise And Sunset</Text>
      <Image
        style={styles?.image}
        source={require('../../assets/sunsetRise.png')}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{sunriseTime}</Text>
        <Text style={styles.time}>{sunSetTime}</Text>
      </View>
    </View>
  );
};

export default SunriseAndSunsetSection;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  headerText: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 15,
  },
  image: {
    resizeMode: "contain",
    height: 110,
    width: "100%",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 15,
  },
});
