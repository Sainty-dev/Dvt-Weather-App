import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { ImageBackground, Alert, Image, StatusBar } from "react-native";
import DailyForeCastHeader from "../components/DailyForeCastHeader";
import Divider from "../components/Divider";
import DailyForeCastDetails from "../components/DailyForeCastDetails";
import useWeatherData from "../hooks/UseWeatherData";
import Loader from "../components/Loader";
import { getDayOfWeek } from "../utils/DateHelper";
import ComfortLevelSection from "../components/ComfortLevelSection";
import WindSection from "../components/WindSection";
import SunriseAndSunsetSection from "../components/SunriseAndSunsetSection";
//import Loader from "../components/Loader";
import Toast from "react-native-toast-message";
import { BACKGROUND_COLORS, WEATHER_IMAGES } from "../constants/Constants";

const Home = ({ navigation }) => {
  const { weatherData, isLoading, fetchWeather, addFavoriteLocation } =
    useWeatherData();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchWeather();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={
          BACKGROUND_COLORS[weatherData?.weatherType] ??
          BACKGROUND_COLORS["Clear"]
        }
      />
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor:
              BACKGROUND_COLORS[weatherData?.weatherType] ??
              BACKGROUND_COLORS["Clear"],
          },
        ]}
      >
        <View>
          {/*Image background view */}
          <ImageBackground
            source={
              WEATHER_IMAGES[weatherData?.weatherType] ??
              WEATHER_IMAGES["Clear"]
            }
            style={styles.backgroundCover}
            imageStyle={styles.image}
          >
            <View style={styles.weatherDetailsContainer}>
              <Text style={styles.degreeText}>
                {weatherData?.currentTemperature} &#176;
              </Text>
              <Text style={styles.city}>{weatherData?.name}</Text>
              <Text
                style={[styles.degreeText, { fontSize: 30, fontWeight: "500" }]}
              >
                {weatherData?.weatherDescription}
              </Text>
            </View>
          </ImageBackground>
          {/*Days Forecast*/}
          <View>
            <DailyForeCastHeader
              min={weatherData?.minimumPossibleTemperature}
              current={weatherData?.currentTemperature}
              max={weatherData?.maximumPossibleTemperature}
            />
            <Divider />
            {weatherData?.days?.map((item, index) => {
              return (
                <DailyForeCastDetails
                  key={index}
                  iconName={item?.weather[0]?.main}
                  day={getDayOfWeek(item?.dt)}
                  temperature={item?.main?.temp}
                />
              );
            })}
            <Divider />
            <ComfortLevelSection
              humidity={weatherData?.humidity}
              feelsLike={weatherData?.feelsLike}
              pressure={weatherData?.pressure}
            />
            <Divider />
            <WindSection
              speed={weatherData?.windSpeed}
              degree={weatherData?.windDegree}
            />
            <Divider />
            <SunriseAndSunsetSection
              sunriseTime={weatherData?.sunriseTime}
              sunSetTime={weatherData?.sunSetTime}
            />
            <Divider />
            <View
              onTouchStart={() => addFavoriteLocation(weatherData)}
              style={{
                flexDirection: "row",
                Padding: 15,
                justifyContent: "space-between",
              }}
            >
              <Text style={styles?.saveText}>Save Location to Favorite</Text>
              <Image
                style={styles?.likeImage}
                source={require("../../assets/addFav.png")}
              />
            </View>
          </View>
        </View>
        {isLoading && <Loader />}
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#54717A",
  },
  image: {
    resizeMode: "cover",
  },
  backgroundCover: {
    height: 320,
    alignItems: "center",
    paddingTop: 65,
  },
  weatherDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  degreeText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 40,
    letterSpacing: 3,
  },
  city: {
    color: "#ffffff",
    fontSize: 15,
    letterSpacing: 3,
  },
  likeImage: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  saveText: {
    alignSelf: "center",
    marginLeft: 15,
    color: "#ffffff",
    fontSize: 15,
  },
  dailyForeCastHeader: {},
});
