import React, { useEffect } from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { supabase } from '../Constants/supabaseClient';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkUserAndNavigate = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;

        if (user) {
          // Immediate Profile Fetch
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .single();

          if (profile) {
            navigation.replace('Main'); // Profile exists
          } else {
            navigation.replace('Welcome1'); // Profile missing
          }
        } else {
          navigation.replace('Welcome1'); // Not logged in
        }
      } catch (error) {
        console.error('Splash Error:', error);
        navigation.replace('Welcome1'); // Fail-safe
      }
    };

    checkUserAndNavigate();
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/images/SplashScreen.png')}
      style={styles.background}
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={{ width: 100, height: 100 }}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
