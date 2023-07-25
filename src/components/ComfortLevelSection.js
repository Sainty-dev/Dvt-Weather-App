import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgressCircle from "react-native-progress-circle";

const ComfortLevelSection = ({humidity,feelsLike,pressure}) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles?.progressLabel}>Humidity</Text>
        <ProgressCircle
          percent={humidity}
          radius={50}
          borderWidth={4}
          color="#ffffff"
          shadowColor="#999"
          bgColor="gray"
        >
          <Text style={styles.ProgressCircleText}>{`${humidity}%`}</Text>
        </ProgressCircle>
      </View>
      <View style={{ justifyContent: "center" }}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.detailsText, { color: "#cfccc4" }]}>
            Feels like
          </Text>
          <Text style={styles.detailsText}>{feelsLike}&#176;</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.detailsText, { color: "#cfccc4" }]}>
            pressure
          </Text>
          <Text style={styles.detailsText}>{pressure}</Text>
        </View>
      </View>
    </View>
  );
};

export default ComfortLevelSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  detailsText: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 15,
    marginRight: 5,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  progressLabel: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 15,
  },
  ProgressCircleText: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 20,
  },
});
