import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import SplashScreen from './src/SplashScreen/SplashScreen';
import Welcome1 from './src/Welcome/Welcome1';
import Welcome2 from './src/Welcome/Welcome2';
import Welcome3 from './src/Welcome/Welcome3';
import Sign_in from './src/auth/Sign_in';
import InputNumber from './src/auth/InputNumber';
import Verify from './src/auth/Verify';
import Gender from './src/auth/Gender';
import NavBar from './src/Components/NavBar';
import ProfileAuth from './src/auth/ProfileAuth';
import { ProfileProvider } from './src/Constants/ProfileContext';
import EmailRegister from './src/auth/EmailRegister';
import GoLive from './src/Screens/Golive';
import FourMultiGuestLive from './src/Constants/GoLive/MultiGuestLive/FourMultiGuestLive';
import SixMultiGuestLive from './src/Constants/GoLive/MultiGuestLive/SixMultiGuestLive';
import NineMultiGuestLive from './src/Constants/GoLive/MultiGuestLive/NineMultiGuestLive';
import TwelveMultiGuestLive from './src/Constants/GoLive/MultiGuestLive/TwelveMultiGuestLive';
import NineAudioLive from './src/Constants/GoLive/AudioLive/NineAudioLive';
import TwelveAudioLive from './src/Constants/GoLive/AudioLive/TwelveAudioLive';
import NineAudioLiveSetup from './src/ZegoCloud/NineAudioLiveSetup';  
import TwelveAudioLiveSetup from './src/ZegoCloud/TwelveAudioLiveSetup';
import SoloLive from './src/Constants/GoLive/SoloLive/SoloLive';
import SoloLiveScreen from './src/ZegoCloud/SoloLiveScreen';
import { supabase } from './src/Constants/supabaseClient';
import 'react-native-url-polyfill/auto';
import Toast from 'react-native-toast-message';


export type RootStackParamList = {
  Splash: undefined;
  Welcome1: undefined;
  Welcome2: undefined;
  Welcome3: undefined;
  Signin: undefined;
  Gender: undefined;
  EmailRegister: undefined;
  InputNumber: undefined;
  Verify: undefined;
  ProfileAuth: undefined;
  Main: undefined;
  GoLive: undefined;
  FourMultiGuestLive: undefined;
  SixMultiGuestLive: undefined;
  NineMultiGuestLive: undefined;
  TwelveMultiGuestLive: undefined;
  NineAudioLive:undefined;
  TwelveAudioLive: undefined;
  NineAudioLiveSetup: undefined;
  TwelveAudioLiveSetup: undefined;
  SoloLiveScreen: undefined;
  SoloLive: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(event.url);
      if (error) {
        console.error('Session retrieval error:', error.message);
      } else {
        console.log('Logged in user:', data.user);
      }
    };

    Linking.addEventListener('url', handleDeepLink);
    return () => Linking.removeAllListeners('url');
  }, []);

  return (
    <>
     <ProfileProvider> 
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name='Splash' options={{ headerShown: false }} component={SplashScreen} />
        <Stack.Screen name='Welcome1' options={{ headerShown: false }} component={Welcome1} />
        <Stack.Screen name='Welcome2' options={{ headerShown: false }} component={Welcome2} />
        <Stack.Screen name='Welcome3' options={{ headerShown: false }} component={Welcome3} />
        <Stack.Screen name='Signin' options={{ headerShown: false }} component={Sign_in} />
        <Stack.Screen name='EmailRegister' options={{ headerShown: false }} component={EmailRegister} />
        <Stack.Screen name='InputNumber' options={{ headerShown: false }} component={InputNumber} />
        <Stack.Screen name='Verify' options={{ headerShown: false }} component={Verify} />
        <Stack.Screen name='Gender' options={{ headerShown: false }} component={Gender} />
        <Stack.Screen name='ProfileAuth' options={{ headerShown: false }} component={ProfileAuth} />
        <Stack.Screen name='Main' options={{ headerShown: false }} component={NavBar} />
        <Stack.Screen name='GoLive' options={{ headerShown: false }} component={GoLive} />
        <Stack.Screen name='FourMultiGuestLive' options={{ headerShown: false }} component={FourMultiGuestLive} />
        <Stack.Screen name='SixMultiGuestLive' options={{ headerShown: false }} component={SixMultiGuestLive} />
        <Stack.Screen name='NineMultiGuestLive' options={{ headerShown: false }} component={NineMultiGuestLive} />
        <Stack.Screen name='TwelveMultiGuestLive' options={{ headerShown: false }}   component={TwelveMultiGuestLive} />
        <Stack.Screen name='NineAudioLive' options={{ headerShown: false }} component={NineAudioLive} />
        <Stack.Screen name='TwelveAudioLive' options={{ headerShown: false }} component={TwelveAudioLive} />
        <Stack.Screen name='NineAudioLiveSetup' options={{ headerShown: false }} component={NineAudioLiveSetup} />
        <Stack.Screen name='TwelveAudioLiveSetup' options={{ headerShown: false }} component={TwelveAudioLiveSetup} />
        <Stack.Screen name='SoloLive' options={{ headerShown: false }} component={SoloLive} />
        <Stack.Screen name='SoloLiveScreen' options={{ headerShown: false }} component={SoloLiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
     <Toast />
     </ProfileProvider>
    
    </>
    
  );
};

export default App;
