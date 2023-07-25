import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DailyForeCastHeader = ({min,current,max}) => {
  return (
    <View style ={styles.container}>
        <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{min}&#176;</Text>
      <Text style={styles.headerText}>min</Text> 
        </View>

        <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{current}&#176;</Text>
      <Text style={styles.headerText}>current</Text> 
        </View>

        <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{max}&#176;</Text>
      <Text style={styles.headerText}>max</Text> 
        </View>

    </View>
  )
}

export default DailyForeCastHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15
    },
    headerText:{
        color:'#ffffff',
        fontWeight:'400'
    },
    headerTextContainer:{
        alignItems:'center'
    }
})