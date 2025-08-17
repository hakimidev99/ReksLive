import { View, Text, } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React from 'react'

const MoreView = () => {
  return (
 <View style={{
   display:"flex",
   flexDirection:"row",
   justifyContent:"center",
   alignItems:"center"
 }}>   
 <View>
  <Text style={{
  fontFamily:"Poppins-Medium",
  fontSize:12,
   color: "rgba(0,0,0,0.5)"
}}>More</Text>
 </View>

   <View style={{
   display:"flex",
   flexDirection:"row",
   justifyContent:"center",
   alignItems:"center"
   
 }}> 


    <MaterialIcons name="keyboard-arrow-down" size={24}  color= "rgba(0,0,0,0.2)"/>
   
   </View> 
 </View>
 
  )
}

export default MoreView