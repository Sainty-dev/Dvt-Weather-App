import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import ListViewItem from "../components/ListViewItem";
import useWeatherData from "../hooks/UseWeatherData";
import WeatherModal from "../components/WeatherModal";

const Favorite = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const {
    favoriteLocations,
    loadFavoriteLocationsFromStorage,
    removeFavoriteLocation,
  } = useWeatherData();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadFavoriteLocationsFromStorage();
    });
    return unsubscribe;
  }, [navigation]);
  const renderItem = ({ item }) => (
    <ListViewItem
      cityName={item?.name}
      weatherDescription={item?.weatherDescription}
      temperature={item?.currentTemperature}
      type={item?.weatherType}
    />
  );
  const handleDelete = () => {
    removeFavoriteLocation(modalData);
    setModalVisible(false);
  };
  const onItemClicked = (item) => {
    setModalVisible(true);
    setModalData(item);
  };
  const EmptyListComponent = () => (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "gray" }}>You don't have any saved Locations</Text>
    </View>
  );
  const handleRefresh = async () => {
    setRefreshing(true);
    loadFavoriteLocationsFromStorage();
    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteLocations}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={EmptyListComponent}
      />
      <WeatherModal
        isVisible={modalVisible}
        data={modalData}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
