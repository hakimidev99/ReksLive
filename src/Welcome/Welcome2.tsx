import { ImageBackground, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


interface Welcome2Props{
  navigation: any 
}

const Welcome2: React.FC <Welcome2Props>= ({navigation}) => {
  return ( 
  <ImageBackground
         source={require("@/assets/images/welcomeBackground.png")}
         style={{
           position: "relative",
  flex: 1,
  paddingHorizontal: 8,
  paddingVertical: 16,
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
           width: wp('100%'),
      }}
         resizeMode="stretch"
       >
       <SafeAreaView 
         style={{
           width: wp('100%'),
           height: hp('100%'),
           flex:1,
           position:"absolute",
           paddingHorizontal:9,

         }}
       >
   
         <View  style={{
            position:"relative",
            justifyContent:"center",
            alignItems:"center"
          }}>
           {/* <Text
             style={{
               fontFamily: "Montserrat-ExtraBold",
               fontSize:30,
               color:"#000",
               transform: [{ rotate: "-12deg" }],
    paddingHorizontal: 8,
    position: "relative",
    top: 10,
    left: 0,
             }} >
                           Support Your Favorite Streamers
           </Text> */}
         
         </View>
         <View    style={{
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    gap: 8, // Remove if using React Native < 0.71
  }} >
                
           <Image
             source={require("../assets/images/welcomeimage1white.png")}
             style={{
              maxWidth:"100%",
              width: "100%",
    height: "90%",
    marginHorizontal: 16,
    position: "relative",
              margin:16,
             }}
             resizeMode="contain"
           />
   
           <TouchableWithoutFeedback
           onPress={() => navigation.navigate("Welcome3") }
          
           >
             <LinearGradient
             colors={['rgba(212,175,55,1)', 'rgba(239,255,214,0.2)']} 
               style={{
                width:"50%",
                height:80,
                position:"absolute",
                bottom:0,
                padding:5,
                marginTop:16,
                  marginBottom:16,
                left:"auto",
                right:0,
                justifyContent:"center",
                flex:1,
                alignItems:"flex-end",
                 borderTopRightRadius: 50,
                 borderBottomRightRadius: 50,
               }}
               start={{ x: 1, y: 0 }}
               end={{ x: 0, y: 0 }}
             >
               <View  style={{
width:65,
height:65,
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

export default Welcome2