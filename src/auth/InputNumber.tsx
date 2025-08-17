import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Alert } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import NextBtn from '../Constants/NextBtn';
import { createClient } from '@supabase/supabase-js';


interface InputNumberProps {
  navigation: any;
}

const InputNumber: React.FC<InputNumberProps> = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCodes] = useState('NG');
  const [callingCode, setCallingCode] = useState('234');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

const handleSendCode = async () => {
  const fullPhone = `+${callingCode}${phone}`;
  setLoading(true);

  try {
    const response = await fetch('https://qekvrqmgjxjolfioazya.functions.supabase.co/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: fullPhone }),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || 'Failed to send code');

    // Navigate to Verify Screen with request_id for checking OTP later
    navigation.navigate('Verify', {
      phone: fullPhone,
      request_id: result.request_id,  // You'll need this in Verify Screen
    });
  } catch (error: any) {
    console.error('Send OTP Error:', error.message);
    Alert.alert('Error', error.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <ImageBackground
      source={require('@/assets/images/background2.png')}
      style={{
        width: wp('100%'),
        height: hp('100%'),
        position: 'relative',
      }}
      resizeMode='stretch'>
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <View
          style={{
            width: '100%',
            height: hp('70%'),
            position: 'absolute',
            padding: 16,
            bottom: 0,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 9, height: 9 },
            shadowOpacity: 1,
            shadowRadius: 5.84,
            elevation: 5,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13 }}>
            Sign In 1/2
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 10,
            }}>
            Please enter your phone number
          </Text>

          <View
            style={{
              backgroundColor: 'rgba(217,217,217,0.1)',
              marginTop: 20,
              borderRadius: 10,
              width: '100%',
              paddingLeft: 8,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 0,
              }}>
              <CountryPicker
                countryCode={countryCode}
                withFlag
                withCallingCode
                withFilter
                withModal
                visible={visible}
                onSelect={country => {
                  setCountryCodes(country.cca2);
                  setCallingCode(country.callingCode[0]);
                  setVisible(false);
                }}
                onClose={() => setVisible(false)}
              />
              <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Medium' }}>
                +{callingCode}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: 50,
                width: 5,
                marginLeft: 5,
                backgroundColor: '#fff',
              }}
            />
            <TextInput
              style={{ fontSize: 14, fontFamily: 'Montserrat-Medium' }}
              placeholder='Enter Phone Number'
              keyboardType='phone-pad'
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <NextBtn handlePress={handleSendCode} disabled={phone.length === 0 || loading} />

          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 13,
                color: 'rgba(217,217,217,1)',
              }}>
              Other Login Method
            </Text>
            <ScrollView
              style={{ marginTop: 10, width: 70 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
              }}>
              <Image source={require('../assets/images/logos/google-icon-logo.png')} />
              <Image source={require('../assets/images/logos/facebook-logo.png')} />
              <Image source={require('@/assets/images/logos/X-logo.png')} />
              <Image source={require('@/assets/images/logos/VKontakte-logo.png')} />
              <Image source={require('../assets/images/logos/apple-logo.png')} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
};

export default InputNumber;
