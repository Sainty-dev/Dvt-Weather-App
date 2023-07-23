import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Favorite from "../screens/Favorite";
import Map from "../screens/Map";
import { CloudIcon, MapPinIcon, StarIcon } from "react-native-heroicons/solid";

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          options={{
            drawerIcon: () => <CloudIcon color="gray" size={25} />,
            headerTransparent: true,
            headerTitle: "",
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          name="Favorite"
          component={Favorite}
          options={{
            drawerIcon: () => <StarIcon color="gray" size={25} />,
          }}
        />
        <Drawer.Screen
          name="Map"
          component={Map}
          options={{
            drawerIcon: () => <MapPinIcon color="gray" size={25} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
