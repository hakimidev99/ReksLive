
import LinearGradient from 'react-native-linear-gradient';
import { Image, ImageBackground, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
interface Welcome1Props {
  navigation: any; // Replace with proper navigation typing if using TypeScript navigation
}

const Welcome1: React.FC<Welcome1Props> = ({ navigation }) => {
  return (
 <ImageBackground
      source={require("../assets/images/welcomeBackground.png")}
      style={{
        width: wp('100%'),
        position: 'relative',
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
   }}
      resizeMode="stretch"
    >
    <SafeAreaView 
      style={{
        width: wp('100%'),
        height: hp('100%'),
            paddingHorizontal:9,
      
      }}
    >

       <View style={{
position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 38, 
      }}>
        {/* <Text
          style={{
            fontFamily: "Montserrat-ExtraBold",
              fontSize: 30,
    color: "#000",
    transform: [{ rotate: "-12deg" }],
    paddingHorizontal: 8,
    position: "relative",
    top: 10,
    left: 0,
          }}
        >
          Join the Conversation
        </Text> */}
        <Text style={{
          textAlign: "left",
    position: "relative",
    top: -10,
    fontSize: 16,
    color: "#374151", // Tailwind's gray-700
    paddingHorizontal: 16,
        }}>
          lets you instantly join or create live audio and video conversations.
          Share your thoughts,
          react to the moment, and feel closer than ever before.
        </Text>
      </View>
      <View style={{
        flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
      }}>
               
        <Image
          source={require("../assets/images/welcomeimage1.png")}
      style={{
          width: '90%',
    height: '90%',
    marginTop: -20,
    marginBottom: -20,
      }}
          resizeMode="contain"
        />

        <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Welcome2") }
        >
          <LinearGradient
         colors={['rgba(212,175,55,1)', 'rgba(239,255,214,0.2)']} 
            style={{
                width:344,
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

export default Welcome1