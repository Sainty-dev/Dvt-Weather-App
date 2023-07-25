import { StyleSheet, Text, View,Image } from "react-native";
import React from "react";
import ProgressCircle from "react-native-progress-circle";
const windmillIcon = require('../../assets/windmil.png');
const WindSection = ({speed,degree}) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles?.progressLabel}>Wind</Text>
         <Image style={styles?.image} source={windmillIcon}/>
      </View>
      <View style={{ justifyContent: "center" }}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.detailsText, { color: "#cfccc4" }]}>
           Wind Speed
          </Text>
          <Text style={styles.detailsText}>{speed}&#176;</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[styles.detailsText, { color: "#cfccc4" }]}>
            Wind Degree
          </Text>
          <Text style={styles.detailsText}>{degree}</Text>
        </View>
      </View>
    </View>
  );
};

export default WindSection;

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
  image:{
    resizeMode:'contain',
    width:120,
    height:120
  }
});
