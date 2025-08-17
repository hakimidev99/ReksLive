import { 
  View, Text, ImageBackground, TouchableOpacity, 
  TouchableWithoutFeedback, Image, ScrollView, Keyboard, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
// import Clipboard from '@react-native-clipboard/clipboard';

import ActivitiesBtn from '../Profile/ActivitiesBtn';
import FanGroupBtn from '../Profile/FanGroupBtn';
import WalletBtn from '../Profile/WalletBtn';
import TaskBtn from '../Profile/TaskBtn';
import ItemBag from '../Profile/ItemBag';
import MyPostBtn from '../Profile/MyPostBtn';
import Help_Feedback from '../Profile/Help_Feedback';
import { useRoute } from '@react-navigation/native';
import { useProfile } from '../Constants/ProfileContext';

type ProfileRouteParams = {
  profileImageUrl?: string;
};

const Profile = () => {
  const { profile } = useProfile();
  const route = useRoute();
  const { profileImageUrl } = (route.params as ProfileRouteParams) || {};

  // const copyUserId = () => {
  //   if (profile?.user_id) {
  //     Clipboard.setString(profile.user_id.toString());
  //     Alert.alert('Copied', 'User ID has been copied to clipboard.');
  //   }
  // };

  return (
    <ImageBackground source={require("../assets/images/Background3.png")} style={{ flex: 1 }}>
      <SafeAreaView>

        {/* Top Right Icons */}
        <View style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 16,
        }}>
          <TouchableOpacity>
            <Ionicons name='settings-outline' size={30} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name='account-settings-outline' size={30} color={"#000"} />
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={{
          width: "100%",
          flexGrow: 1,
          marginTop: 25,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {profile ? (
                <>
                  <Image
                    source={
                      profile?.avatar_url && profile.avatar_url.trim() !== ""
                        ? { uri: profile.avatar_url }
                        : require("../assets/images/user.png")
                    }
                    style={{ width: 80, height: 80, borderRadius: 50 }}
                  />
                  <View style={{
                    marginTop: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 16,
                  }}>
                    <Text style={{ marginTop: 10, fontFamily: "Montserrat-Bold", fontSize: 18 }}>
                      {profile.username}
                    </Text>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                      <Text style={{
                        marginTop: 1,
                        fontFamily: "Montserrat-Bold",
                        marginRight: 4,
                        fontSize: 18,
                      }}>
                        ID: {profile?.user_id || 'Loading...'}
                      </Text>
                      {/* <TouchableOpacity onPress={copyUserId}> */}
                        <MaterialIcons name="content-copy" size={24} color="#000000" />
                      {/* </TouchableOpacity> */}
                    </View>
                  </View>
                </>
              ) : (
                <Text>Loading...</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* Fans / Followers / Friends */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
          paddingHorizontal: 20,
        }}>
          {["Fans", "Followers", "Friends"].map((label, index) => (
            <View key={index} style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 16, fontFamily: "Montserrat-SemiBold" }}>0</Text>
              <Text style={{ fontFamily: "Montserrat-Medium" }}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Levels / VIP / Family */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          paddingHorizontal: 16,
        }}>
          <ImageBackground source={require("../assets/images/LevelsBackgroundImage/level1.png")} style={{
            width: 115, height: 65,
            justifyContent: "center",
            alignItems: "center",
          }} resizeMode='stretch'>
            <Image source={require('../assets/images/LevelsIcons/Lvl1.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />
            <View>
              <Text style={{
                fontFamily: "Poppins-Medium",
                color: "#fff",
                fontSize: 12,
                textAlign: "center",
                marginTop: 2,
                marginBottom: 5,
              }}>Lvl90</Text>
            </View>
          </ImageBackground>

          <ImageBackground source={require("../assets/images/vip-purchase.png")} style={{
            width: 135, height: 64,
            justifyContent: "center",
            alignItems: "center",
          }} resizeMode='stretch'>
            <Image source={require('../assets/images/icons/Vip.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />
            <View>
              <Text style={{
                fontFamily: "Poppins-Medium",
                color: "#fff",
                fontSize: 12,
                textAlign: "center",
                marginTop: 2,
                marginBottom: 5,
              }}>Purchase Vip</Text>
            </View>
          </ImageBackground>

          <ImageBackground source={require("../assets/images/FamilyBackgroundImage/family.png")} style={{
            width: 115, height: 65,
            justifyContent: "center",
            alignItems: "center",
          }} resizeMode='stretch'>
            <Image source={require('../assets/images/FamilyIcons/Lion-Family.png')} style={{ width: 34, height: 34 }} resizeMode='contain' />
            <View>
              <Text style={{
                fontFamily: "Poppins-Medium",
                color: "#fff",
                fontSize: 12,
                textAlign: "center",
                marginTop: 2,
                marginBottom: 5,
              }}>Reks for Life</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Scrollable Buttons */}
        <ScrollView horizontal showsVerticalScrollIndicator={false} contentContainerStyle={{
          flexDirection: "column",
          alignItems: 'center',
          width: "100%"
        }}>
          <View style={{
            width: "100%",
            height: 5,
            backgroundColor: "rgba(215, 215, 215, 0.3)",
            marginTop: 20,
          }} />
          <WalletBtn />
          <ItemBag />
          <MyPostBtn />
          <View style={{
            width: "100%",
            height: 5,
            backgroundColor: "rgba(215, 215, 215, 0.3)",
            marginTop: 20,
          }} />
          <TaskBtn />
          <FanGroupBtn />
          <ActivitiesBtn />
          <View style={{
            width: "100%",
            height: 5,
            backgroundColor: "rgba(215, 215, 215, 0.3)",
            marginTop: 20,
          }} />
          <Help_Feedback />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;
