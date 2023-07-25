import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Divider = () => {
  return <View style={styles.container}></View>;
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: 1,
    borderWidth: 0.5,
    borderColor: "#ffffff",
  },
});
