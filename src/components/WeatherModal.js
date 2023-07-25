import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const WeatherModal = ({ isVisible, data, onClose, onDelete }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      style={{ zIndex: 100 }}
    >
      <View style={styles.promptContainer}>
        <View style={styles.modalContent}>
          <Text style={{ alignSelf: "center" }}>
            Hey 😁 at {data?.name} is currently {data?.weatherDescription}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onDelete}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  promptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 15,
    width: 100,
  },
  buttonText: {
    color: "#ffffff",
    alignSelf: "center",
  },
});

export default WeatherModal;
