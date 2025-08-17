import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import NextBtn from '../Constants/NextBtn';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../Constants/supabaseClient';

interface VerifyProps {
  navigation: any;
}

const Verify: React.FC<VerifyProps> = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef<Array<TextInput | null>>([]);

  const route = useRoute();
  const { email } = route.params as { email: string };

  const [resendTimer, setResendTimer] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (text: string, idx: number) => {
    if (!/^\d*$/.test(text)) return;
    const newCode = [...code];
    newCode[idx] = text;
    setCode(newCode);

    if (text && idx < 5) {
      inputs.current[idx + 1]?.focus();
    }
    if (!text && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  useEffect(() => {
    if (resendTimer === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (resendTimer > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendTimer]);

  const startResendTimer = () => setResendTimer(60);

  const handleVerifyCode = async () => {
    const otpCode = code.join('');
    if (otpCode.length < 6) {
      Alert.alert('Error', 'Please enter the full verification code.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'email',
      });

      if (error) {
        throw new Error(error.message);
      }

      Alert.alert('Success', 'Email verified!');
      navigation.navigate('Gender', { email });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        email,
        type: 'signup',
      });

      if (error) {
        throw new Error(error.message);
      }

      Alert.alert('Success', 'Verification code resent.');
      startResendTimer();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background2.png')}
      style={{ width: wp('100%'), height: hp('100%'), position: 'relative' }}
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
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13 }}>Sign Up 2/2</Text>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, textAlign: 'center', marginTop: 10 }}>
            Email Verification
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 13,
              textAlign: 'center',
              color: 'rgba(0,0,0,0.5)',
            }}>
            Please Type The Verification Code Sent to {email}
          </Text>
          <View
            style={{
              marginTop: 20,
              borderRadius: 10,
              width: '100%',
              paddingLeft: 8,
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              paddingRight: 8,
            }}>
            {[0, 1, 2, 3, 4, 5].map((_, idx) => (
              <TextInput
                key={idx}
                style={{
                  fontSize: 25,
                  fontFamily: 'Montserrat-Medium',
                  backgroundColor: 'rgba(217,217,217,0.1)',
                  width: 50,
                  height: 50,
                  textAlign: 'center',
                  borderRadius: 5,
                  borderColor: '#D9D9D9',
                }}
                maxLength={1}
                keyboardType='number-pad'
                value={code[idx] || ''}
                onChangeText={(text) => handleInputChange(text, idx)}
                ref={(ref) => {
                  inputs.current[idx] = ref;
                }}
                returnKeyType='next'
                onSubmitEditing={() => {
                  if (idx < 5) inputs.current[idx + 1]?.focus();
                }}
                blurOnSubmit={false}
              />
            ))}
          </View>
          <NextBtn handlePress={handleVerifyCode}  isLoading={loading} />
          <View
            style={{
              marginTop: 20,
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'rgba(0,0,0,0.5)',
                fontFamily: 'Montserrat-Medium',
                fontSize: 12,
              }}>
              Didn't receive a code?{' '}
            </Text>
            <TouchableOpacity onPress={handleResendCode} disabled={loading || resendTimer > 0}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 12,
                  color: resendTimer > 0 ? '#aaa' : '#D4AF37',
                }}>
                {resendTimer > 0 ? `Resend (${resendTimer}s)` : 'Resend'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Verify;
