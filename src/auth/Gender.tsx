import { View, Text, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GenderBx from '../Constants/GenderBx';
import NextBtn from '../Constants/NextBtn';
import AgeBx from '../Constants/AgeBx';
import { supabase } from '../Constants/supabaseClient';

interface GenderProps {
  navigation: any;
}

const Gender: React.FC<GenderProps> = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!selectedGender || !selectedAge) {
      Alert.alert('Please select both gender and age');
      return;
    }

    setLoading(true);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        throw new Error('User not authenticated');
      }

      const userId = userData.user.id;

      const { error } = await supabase
        .from('profiles')
        .update({
          gender: selectedGender,
          age: selectedAge,
        })
        .eq('id', userId);

      if (error) {
        throw new Error(error.message);
      }

      navigation.replace('ProfileAuth', { gender: selectedGender, age: selectedAge });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const isNextDisabled = !selectedGender || !selectedAge || loading;

  return (
    <ImageBackground
      source={require("@/assets/images/background2.png")}
      style={{
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        position: "relative",
      }}
      resizeMode='stretch'
    >
      <SafeAreaView style={{
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        position: "relative",
      }}>
        <View
          style={{
            width: "100%",
            height: hp('70%'),
            position: "absolute",
            padding: 16,
            bottom: 0,
            backgroundColor: "#fff",
            shadowColor: "#000",
            shadowOffset: { width: 9, height: 9 },
            shadowOpacity: 1,
            shadowRadius: 5.84,
            elevation: 5,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileAuth')}>
            <Text style={{
              width: "auto",
              fontFamily: "Poppins-Medium",
              fontSize: 13,
              textAlign: "right",
              color: "rgba(0,0,0,0.5)",
              paddingRight: 8,
            }}>Skip</Text>
          </TouchableOpacity>

          <Text style={{
            width: "auto",
            fontFamily: "Poppins-Medium",
            fontSize: 16,
            textAlign: "center",
            marginTop: 10,
          }}>Your Gender</Text>

          <View style={{
            marginTop: 25,
            flexDirection: "row",
            gap: 25,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <GenderBx
              icon={<Ionicons name='female' size={30} color="#000" />}
              text='Female'
              style={{
                borderWidth: selectedGender === 'female' ? 3 : 0,
                borderColor: selectedGender === 'female' ? 'pink' : 'transparent'
              }}
              onPress={() => setSelectedGender('female')}
            />
            <GenderBx
              icon={<Ionicons name='male' size={30} color="#000" />}
              text='Male'
              style={{
                borderWidth: selectedGender === 'male' ? 3 : 0,
                borderColor: selectedGender === 'male' ? 'blue' : 'transparent'
              }}
              onPress={() => setSelectedGender('male')}
            />
          </View>

          <View style={{ marginTop: 25 }}>
            <Text style={{
              fontFamily: "Poppins-Medium",
              fontSize: 16,
              textAlign: "center"
            }}>
              Your Age
            </Text>
            <Text style={{
              fontFamily: "Poppins-Medium",
              fontSize: 13,
              textAlign: "center",
              color: "rgba(0,0,0,0.5)",
            }}>
              Age information is invisible to others
            </Text>
          </View>

          <View style={{
            marginTop: 25,
            flexDirection: "row",
            gap: 10,
            justifyContent: "center",
            alignItems: "center"
          }}>
            {['<18', '18-24', '24-34', '35+'].map((ageRange) => (
              <AgeBx
                key={ageRange}
                style={{
                  borderWidth: selectedAge === ageRange ? 3 : 0,
                  borderColor: selectedAge === ageRange ? '#D4AF37' : 'transparent',
                  borderRadius: 100,
                  height: 30,
                  padding: 0,
                }}
                text={ageRange}
                textStyle={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 12,
                }}
                onPress={() => setSelectedAge(ageRange)}
              />
            ))}
          </View>

          <TouchableWithoutFeedback>
            <View>
              <NextBtn handlePress={handleNext} disabled={isNextDisabled} isLoading={loading} />
            </View>
          </TouchableWithoutFeedback>

          <View style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 100,
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Empty Spacer */}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Gender;
