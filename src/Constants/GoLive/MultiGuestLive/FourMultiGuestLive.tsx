import { View, Text } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FourMultiGuestLive = () => {
  return (
    <View style={{
      flexDirection: 'row',
      width: '100%',
      height: '80%',
    }}>
      {/* Left Frame */}
      <View style={{
        backgroundColor: 'black',
        width: '50%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
      }}>
         <Text style={{
              color:"#fff",
              fontSize:16,
              fontFamily:"Montserrat-Bold",
              }}>No Camera</Text>
        {/* You can add content for left frame here */}
      </View>
      {/* Right Seaters Box */}
      <View style={{
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* Child View 1 */}
        <View style={{
          borderWidth: 1,
          borderColor: '#D9D9D9',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
        </View>
        {/* Child View 2 */}
        <View style={{
          borderWidth: 1,
          borderColor: '#D9D9D9',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
        </View>
        {/* Child View 3 */}
        <View style={{
          borderWidth: 1,
          borderColor: '#D9D9D9',
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
        </View>
      </View>
    </View>
  );
};

export default FourMultiGuestLive;
