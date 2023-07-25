import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";

const Loader = () => {
  return (
    <Modal isVisible={true} backdropOpacity={0.5}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner color="#ffffff" visible={true} />
        <Text style={{ marginTop: 15, color: "#ffffff" }}>Please wait ...</Text>
      </View>
    </Modal>
  );
};

export default Loader;
