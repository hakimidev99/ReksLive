import { View, Text,ImageBackground, Image,TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import React from 'react'

const Chat = () => {
  return (
    <ImageBackground source={require("../assets/images/Background3.png")} style={{
      paddingHorizontal:10,
 flex:1,
    }}>
      <SafeAreaView style={{
        flex:1,
      }}>
 <View style={{
          flexDirection:"row",
             justifyContent:"space-between",
        }}>
          <View>
             <Text style={{
              fontFamily:"Montserrat-Black",
              fontSize:18,
             }}>Messages</Text>
          </View >
          <View style={{
       gap:10,
            flexDirection:"row"
          }}>
                  <EvilIcons name='navicon' size={35} color={"#000"}/>
          </View>
        </View>
 <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
      }}>
        <Text style={{
          fontSize:16,
          fontFamily:"Montserrat-SemiBold"
        }}>No Message or Chat here</Text>
      </View>
    </SafeAreaView>
    </ImageBackground>
   
  )
}

export default Chat