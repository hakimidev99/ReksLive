import { View, Text } from 'react-native'
import React from 'react'

const AgeBx = ({
   text ="",
   style ={},
   textStyle={},

   onPress = ()=> {},
}) => {
  return (
   <View
                     style={{
                       width:90,
                       height:70,
                        backgroundColor:"rgba(217,217,217,0.2)",
                        borderRadius:10,
                       justifyContent:"center" ,
                        alignItems:"center",
                        padding:10,
                        ...style
                     }} onTouchEnd={onPress}>
                          <Text style={{
                           textAlign:"center",
                            marginTop:2, fontFamily:"Poppins-Medium", fontSize:14, ...textStyle}} > {text}</Text>
                     </View>
  )
}

export default AgeBx
