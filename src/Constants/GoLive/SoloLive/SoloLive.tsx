import { View, Text } from 'react-native'
import React from 'react'

const SoloLive = () => {
  return (
    <View style={{ 
      flexDirection: 'column', 
      width: '100%',
      height: '100%',
      flex: 1,
        backgroundColor: 'skyblue',
    justifyContent: 'center',
      alignItems: 'center', 
      position: 'relative',
    }}>

      <Text style={{
      color:"#fff",
      fontSize:16,
      fontFamily:"Montserrat-Bold",
      }}>No Camera</Text>
    </View>
  )
}

export default SoloLive