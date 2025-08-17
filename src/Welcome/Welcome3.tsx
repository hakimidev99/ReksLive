import { ImageBackground, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React from 'react';

interface Welcome3Props {
  navigation: any 
}

const Welcome3: React.FC<Welcome3Props>= ({navigation}) => {
  return (  <ImageBackground
         source={require("@/assets/images/welcomeBackground.png")}
                  style={{
           width: wp('100%'),
           position: 'relative',
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
      }}
         resizeMode="cover"
       >
          <SafeAreaView 
         style={{
           width: wp('100%'),
           height: hp('100%'),
               flex: 1,
    position: 'relative',
      paddingHorizontal:9,
    justifyContent: 'space-between',
    alignItems: 'center',
         }}
       >
    <View style={{
              position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
         }}>
           <Text
             style={{
         color: "#000",
    paddingHorizontal: 16, // px-4 = 16px
    marginHorizontal: 24, 
    fontFamily: "Montserrat-ExtraBold",
    fontSize: 28,
    textAlign: "center",
    lineHeight: 32,
    transform: [{ rotate: "-10deg" }],
             }}
           >
                           Blockbuster Movies, Live with Friends
Never Miss a Goal: Live Sports Streaming
           </Text>
         
         </View>
         <View   style={{
              flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingHorizontal: 0,
         }} >
          
                
           <Image
             source={require("../assets/images/welcomeimage3.png")}
style={{
      width: '100%',
    height: '100%',
    marginHorizontal: 16,
    position: 'relative',
}}             resizeMode="contain"
           />
   
           <TouchableWithoutFeedback
           onPress={() => navigation.navigate("Signin") }
          
           >
             <LinearGradient
             colors={['rgba(212,175,55,1)', 'rgba(212,175,55,1)']} 
               style={{
                width:80,
                height:80,
                position:"absolute",
                bottom:0,
                padding:5,
                marginTop:16,
                left:"auto",
                right:0,
                justifyContent:"center",
                flex:1,
                alignItems:"center",
                borderRadius: 100,
               }}
               start={{ x: 1, y: 0 }}
               end={{ x: 0, y: 0 }}
             >
               <View 
               style={{
width:"100%",
height:"100%",
justifyContent:"center",
borderRadius:100,
                alignItems:"center",
backgroundColor: "rgba(255,255,255,0.2)"
               }}>

                 <FontAwesome6 name="arrow-right" size={32} color="#fff" />
               </View>
             </LinearGradient>
           </TouchableWithoutFeedback>
         </View>
       
       </SafeAreaView>
        
   
    
       </ImageBackground>

  )
}

export default Welcome3