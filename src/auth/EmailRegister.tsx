import {
  View,
  Text,
  ImageBackground,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NextBtn from '../Constants/NextBtn';
import { supabase } from '../Constants/supabaseClient';
import Toast from 'react-native-toast-message';

interface EmailRegisterProps {
  navigation: any;
}

const EmailRegister: React.FC<EmailRegisterProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [criteria, setCriteria] = useState({
    uppercase: false,
    lowercase: false,
    digit: false,
    symbol: false,
  });

  useEffect(() => {
    setCriteria({
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
      symbol: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match.',
      });
      return;
    }

    if (!criteria.uppercase || !criteria.lowercase || !criteria.digit || !criteria.symbol) {
      Toast.show({
        type: 'error',
        text1: 'Password is too weak.',
        text2: 'Use uppercase, lowercase, number, and symbol.',
      });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error?.message || 'Unknown error',
      });
      setLoading(false);
      return;
    }

    // Navigate to Verify.tsx with email as parameter
    navigation.navigate('Verify', { email });

    setLoading(false);
  };

  const getBorderColor = () => {
    if (confirmPassword.length === 0) return '#ccc';
    return password === confirmPassword ? 'green' : 'red';
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background2.png')}
      style={{
        width: wp('100%'),
        height: hp('100%'),
        position: 'relative',
      }}
      resizeMode="stretch"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: hp('70%'),
            position: 'absolute',
            padding: 16,
            bottom: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            elevation: 5,
          }}
        >
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13 }}>
            Sign Up 1/2
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            Create your account
          </Text>

          <TextInput
            style={{
              marginTop: 20,
              backgroundColor: 'rgba(217,217,217,0.1)',
              borderRadius: 10,
              paddingLeft: 10,
              height: 50,
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
            }}
            placeholder="Enter Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={{
              marginTop: 15,
              backgroundColor: 'rgba(217,217,217,0.1)',
              borderRadius: 10,
              paddingLeft: 10,
              height: 50,
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
            }}
            placeholder="Enter Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={{
              marginTop: 15,
              backgroundColor: 'rgba(217,217,217,0.1)',
              borderRadius: 10,
              paddingLeft: 10,
              height: 50,
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              borderWidth: 1,
              borderColor: getBorderColor(),
            }}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

         {password.length > 0 && (
  <View style={{ marginTop: 10, }}>
    <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium' }}>
      Password must contain:
    </Text>
    <View style={{
      flexDirection:'row',
      gap:40,
    }}>
      <View>
         <Text style={{ color: criteria.uppercase ? 'green' : 'red' }}>
      • Uppercase letter
    </Text>
    <Text style={{ color: criteria.lowercase ? 'green' : 'red' }}>
      • Lowercase letter
    </Text>
      </View>
     
    <View>  
      <Text style={{ color: criteria.digit ? 'green' : 'red' }}>
      • Number
    </Text>
    <Text style={{ color: criteria.symbol ? 'green' : 'red' }}>
      • Symbol
    </Text>
       </View>
  
    </View>
    
  </View>
)}


          <NextBtn handlePress={handleRegister} disabled={loading || !email || !password || !confirmPassword} />

          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 13,
                color: 'rgba(217,217,217,1)',
              }}
            >
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
              }}
            >
              <Image source={require('../assets/images/logos/google-icon-logo.png')} />
              <Image source={require('../assets/images/logos/apple-logo.png')} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default EmailRegister;
