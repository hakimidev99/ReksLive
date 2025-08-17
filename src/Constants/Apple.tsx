import { View, Text, Image } from 'react-native'
import React from 'react'

const Apple = () => {
  return (
  <View style={{
  display: 'flex',
  flexDirection: 'row',
position: 'relative',
  width: "100%",
  height: 48,
  backgroundColor: '#FFF',
  borderRadius: 100, 
  borderColor:"#000000",
  borderWidth:1,
  justifyContent: "center",
  alignItems: 'center',

 }}>
 <Image source={require('../assets/images/logos/apple-logo.png')}
 style={{
  margin:20,
    justifyContent:"flex-end",
    alignItems:"flex-end",
    position: 'absolute',
    left:0,
 }} />
  <Text
  style={{
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: '#000000',

  }}>Sign in Apple</Text>
 </View>
  )
}

export default Apple