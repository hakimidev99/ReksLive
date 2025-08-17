import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { supabase } from './supabaseClient'; // your Supabase instance
import type { NavigationProp } from '@react-navigation/native';

const Google = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const redirectUrl = Platform.OS === 'android'
    ? 'com.rekslive://auth/callback'
    : 'com.rekslive://auth/callback';

  const handleGoogleSignIn = async () => {
    const authUrl = `${supabase.auth.url}/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`;

    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(authUrl, redirectUrl);

        if (result.type === 'success' && result.url) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(result.url);
          if (error) {
            console.error('Supabase SignIn Error:', error);
            Alert.alert('Supabase SignIn Error', error.message);
            return;
          }
          console.log('User signed in:', data);
          navigation.navigate('Main', { profileImageUrl: data.user.user_metadata.avatar_url || '' });
        }
      } else {
        Linking.openURL(authUrl);
      }
    } catch (err) {
      console.error('Google SignIn Error:', err);
      Alert.alert('Google SignIn Error', err.message);
    }
  };

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(event.url);
      if (error) {
        console.error('Deep link sign-in error:', error.message);
      } else {
        console.log('Signed in user:', data.session?.user);
        navigation.navigate('Main', { profileImageUrl: data.session?.user?.user_metadata?.avatar_url || '' });
      }
    };

    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);
    return () => linkingSubscription.remove();
  }, [navigation]);

  return (
    <TouchableOpacity onPress={handleGoogleSignIn} style={{
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      width: '100%',
      height: 48,
      backgroundColor: '#FFF',
      borderRadius: 100,
      borderColor: '#000000',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image source={require('../assets/images/logos/google-icon-logo.png')}
        style={{
          margin: 20,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          position: 'absolute',
          left: 0,
        }} />
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
          color: '#000000',
        }}>Sign in with Google</Text>
    </TouchableOpacity>
  );
};

export default Google;
