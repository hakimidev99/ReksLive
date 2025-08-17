import { View, Text, Image} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React from 'react'

const WalletBtn = () => {
  return (
      <View style={{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"center",
      paddingHorizontal:16,
      marginTop:5,
      marginBottom:5,
      }}>
        <Image source={require('@/assets/images/icons/wallet.png')} style={{
          width:30, height:30, }} />
      <Text style={{
        flexGrow:1,
       paddingLeft:8,
       fontSize:14,
        fontFamily:"Montserrat-Medium",
      }}>Wallet</Text>
      <MaterialIcons name='arrow-forward-ios' size={24} color={"#000"} />
    </View>
  )
}

export default WalletBtn