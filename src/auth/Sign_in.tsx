import { View,  ImageBackground, Text , Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Facebook from '../Constants/Facebook';
import Twitter from '../Constants/Twitter';
import Apple from '../Constants/Apple';
import Vkontak from '../Constants/Vkontak';
import MoreView from '../Constants/MoreView';
import Google from '../Constants/Google';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Sign_inProps{
  navigation: any 
}
const Sign_in:React.FC<Sign_inProps> = ({navigation}) => {
    const [showMore, setShowMore] = useState(false);

  return (
      <ImageBackground 
      source={require('@/assets/images/welcomeBackground.png')}
        style={{
                 width: wp('100%'),
                 height: hp('100%'),
                 padding:8,
                 flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
               }}>   
                 <SafeAreaView style={{
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
       width: wp('100%'),
                 height: hp('100%'),
  }}>
     <View style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
    gap: 8, 
  }}>
                  <View>
                     <Text 
 style={{
  textAlign:"center",
  fontFamily:"Poppins-Medium",
  fontSize:13,
 }}>Sign in for best experience</Text>
                  </View>

 <TouchableWithoutFeedback onPress={()=>{ navigation.navigate("EmailRegister")}}>
  <View style={{
  display: 'flex',
  flexDirection: 'row',
position: 'relative',
  width: "100%",
  height: 48,
  backgroundColor: '#D4AF37',
  borderRadius: 100,
  justifyContent: "center",
  alignItems: 'center',
 shadowColor: "#D4AF37",
    shadowOffset: { width: 8, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
 }}>
  <Ionicons name="phone-portrait-outline" size={28} color="#fff"  style={{
    margin:20,
    justifyContent:"flex-end",
    alignItems:"flex-end",
    position: 'absolute',
    left:0,
  }}/>
  <Text
  style={{
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: '#fff',

  }}>Sign in with Email</Text>
 </View>

 </TouchableWithoutFeedback>
<>
<Google navigation={navigation} />

  <Apple />
</>

                </View>     
     
    </SafeAreaView>
               
      </ImageBackground>


  )
}

export default Sign_in