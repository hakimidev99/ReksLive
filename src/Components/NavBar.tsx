import { View, Dimensions, Text, Image, Animated, Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import React, { useEffect, useRef } from 'react';
import Home from '../Screens/Home';
import Chat from '../Screens/Chat';
import Golive from '../Screens/Golive';
import Profile from '../Screens/Profile';
import Rekszone from '../Screens/Rekszone';
import { useProfile } from '../Constants/ProfileContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

type TabParamList = {
  Home: undefined;
  Rekszone: undefined;
  Golive: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ProfileTabIcon = ({ focused, avatarUrl }: { focused: boolean; avatarUrl?: string }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  if (!avatarUrl) {
    // Shimmer Placeholder
    return (
      <Animated.View
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: '#E0E0E0',
          opacity: shimmerAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.6, 1, 0.6],
          }),
        }}
      />
    );
  }

  return (
    <Image
      source={{ uri: avatarUrl }}
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: focused ? 2 : 0,
        borderColor: focused ? '#D4AF37' : 'transparent',
      }}
      resizeMode="cover"
    />
  );
};

const NavBar = () => {
  const { profile } = useProfile();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, height: 80 },
        tabBarLabelStyle: { fontFamily: 'Poppins-Medium', fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home-outline" size={24} color={focused ? '#D4AF37' : color} />
          ),
        }}
      />
      <Tab.Screen
        name="Rekszone"
        component={Rekszone}
        options={{
          title: 'ReksZone',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="fire" size={22} color={focused ? '#D4AF37' : color} />
          ),
        }}
      />
      <Tab.Screen
        name="Golive"
        component={Golive}
        options={{
          title: 'Go Live',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                position: 'absolute',
                top: -30,
                backgroundColor: focused ? '#D4AF37' : '#fff',
                borderRadius: 35,
                width: 70,
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 8,
                borderWidth: 3,
                borderColor: focused ? '#fff' : '#D4AF37',
              }}
            >
              <Ionicons name="videocam-outline" size={34} color={focused ? '#fff' : '#D4AF37'} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="message-circle" size={24} color={focused ? '#D4AF37' : color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Me',
          tabBarIcon: ({ color, focused }) => (
            <ProfileTabIcon focused={focused} avatarUrl={profile?.avatar_url} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavBar;
