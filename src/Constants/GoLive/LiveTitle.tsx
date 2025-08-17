import { View, Text, Image, TextInput} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useProfile } from '../ProfileContext';

import React from 'react'

const LiveTitle = () => {
    const { profile } = useProfile();
  
    // if (!profile) {
    //   return <Text>Loading Profile...</Text>;
    // }

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <LinearGradient  colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.25)']} 
      style={{
      padding:16,
 width: '100%',
 height:157,
      borderRadius: 27,
    }}    start={{ x: 1, y: 0}}
            end={{ x: 0, y: 1 }}>
      <View style={{
        flexDirection: 'row',
      }}>
         <View style={{
      backgroundColor: '#fff',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      marginRight: 5,
    width: 60,
      height: 60,}}>
       <Image
              source={{ uri: profile.avatar_url }}
              style={{ width: 60, height: 60, borderRadius: 10 }}
               resizeMode="fit" 
            />
      <Text style={{
        fontSize: 12,
        width: 60,
        textAlign: 'center',
        position: 'absolute',
        bottom:0,
        backgroundColor:'#fff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>Edit</Text>
    </View>
   <TextInput
              style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold'   }}
              placeholder={`Add a titile for your live ${profile.username}`}
              keyboardType='phone-pad'
            />
           
      </View>
       <View style={{
              height: 1,
              width: '100%',
              marginTop: 20,
              backgroundColor: '#fff',
            }}/>
            <View  style={{
              height: '15%',
              width: '20%',
              borderRadius:50,
              marginTop: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.30)',
              justifyContent:'center',
              alignItems:'center',
            }}>
              <FontAwesome5 name="angle-down" size={20} color="#ffffff" />
            </View>
    </LinearGradient>
    </View>
    
  )
}

export default LiveTitle