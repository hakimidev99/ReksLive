import React, { useState } from 'react';
import {
  View, Text, ImageBackground, TouchableOpacity, TextInput,
  ActivityIndicator, Image, TouchableWithoutFeedback, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { supabase } from '../Constants/supabaseClient';
import 'react-native-url-polyfill/auto';
import NextBtn from '../Constants/NextBtn';

type RootStackParamList = {
  ProfileAuth: { gender: string; age: string };
  Main: undefined;
};

type ProfileAuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileAuth'>;

const ProfileAuth = () => {
  const navigation = useNavigation<ProfileAuthScreenNavigationProp>();
  const route = useRoute();
  const { gender, age } = route.params as RootStackParamList['ProfileAuth'];

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', maxWidth: 500, maxHeight: 500 }, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        Alert.alert('Image Picker Error', response.errorMessage);
        return;
      }
      const uri = response.assets?.[0]?.uri;
      if (uri) setImageUri(uri);
    });
  };

const handleSaveProfile = async () => {
  setError(null);

  if (!username.trim()) {
    setError('Please enter a username.');
    return;
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    setError('Username can only contain letters and numbers.');
    return;
  }

  if (!imageUri) {
    setError('Please upload a profile photo.');
    return;
  }

  setUploading(true);

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username.trim())
      .neq('id', user.id)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingUser) {
      setError('Username already taken. Please choose another.');
      setUploading(false);
      return;
    }

    // Upload image
    const fileExt = imageUri.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const file = { uri: imageUri, name: fileName, type: 'image/jpeg' };

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/jpeg',
        metadata: { user_id: user.id },
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData, error: publicUrlError } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(fileName);

    if (publicUrlError) throw publicUrlError;

    const avatarUrl = publicUrlData.publicUrl;

    // Insert profile — let trigger generate unique 9-digit ID
    const { error: insertError } = await supabase.from('profiles').upsert({
      id: user.id,
      username: username.trim(),
      avatar_url: avatarUrl,
      gender,
      age,
      user_id: null // <-- trigger handles generation
    });

    if (insertError) throw insertError;

    Alert.alert('Success', 'Profile saved!');
    navigation.replace('Main');
  } catch (err: any) {
    console.error(err);
    Alert.alert('Error', err.message || 'Something went wrong');
  } finally {
    setUploading(false);
  }
};


  const handleSkip = () => navigation.replace('Main');

  return (
    <ImageBackground
      source={require('@/assets/images/background2.png')}
      style={{ width: wp('100%'), height: hp('100%') }}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: hp('70%'),
            backgroundColor: '#fff',
            padding: 16,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            elevation: 5,
          }}
        >
          <TouchableOpacity onPress={handleSkip}>
            <Text style={{ textAlign: 'right', fontFamily: 'Poppins-Medium', fontSize: 13, color: 'rgba(0,0,0,0.5)' }}>Skip</Text>
          </TouchableOpacity>

          <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Poppins-Medium', fontSize: 16 }}>Username</Text>

          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <TouchableOpacity onPress={pickImage} disabled={uploading}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={{ width: 80, height: 80, borderRadius: 40 }} />
              ) : (
                <Ionicons name="person-circle-outline" size={80} color="rgba(212,175,55,0.5)" />
              )}
              <View style={{ position: 'absolute', left: 55, bottom: 5 }}>
                <Ionicons name="add-circle-outline" size={24} color="rgba(212,175,55,1)" />
              </View>
              {uploading && (
                <ActivityIndicator style={{ position: 'absolute', top: 28, left: 28 }} size="large" color="#D4AF37" />
              )}
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Username"
            style={{
              backgroundColor: 'rgba(217,217,217,0.1)',
              borderRadius: 5,
              height: 50,
              marginTop: 20,
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium'
            }}
            value={username}
            onChangeText={text => setUsername(text.replace(/[^a-zA-Z0-9]/g, ''))}
            maxLength={20}
            editable={!uploading}
          />

          {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>}

          <TouchableWithoutFeedback>
            <NextBtn handlePress={handleSaveProfile} isLoading={uploading} />
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProfileAuth;
