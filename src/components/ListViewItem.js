import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { WEATHER_TEXT_SYMBOLS } from '../constants/Constants'

const ListViewItem = ({cityName,weatherDescription,temperature,type}) => {
  return (
    <TouchableWithoutFeedback onPress={() =>{}} style={styles?.container}>
        <View>
        <Text style={styles?.CityName}>{cityName}</Text>
         <Text style={styles?.weatherDescriptionText}>{weatherDescription}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={styles?.weatherSymbol}>{WEATHER_TEXT_SYMBOLS[type]}</Text>
        <Text style={styles?.Temperature}>{temperature} &#176;</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default ListViewItem

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical:7,
    
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        padding: 10,
    },
    CityName:{
   fontSize:15,
   color:'black'
    },
    weatherDescriptionText:{
        fontSize:15,
        color:'gray'
    },
    Temperature:{
        fontSize:15,
        fontWeight:'bold',
        color:'gray'
    },
    weatherSymbol:{
       fontSize:25,
       marginRight:10
    },

})