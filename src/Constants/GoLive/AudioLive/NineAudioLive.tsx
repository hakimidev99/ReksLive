import { View, Image } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useProfile } from '@/Constants/ProfileContext';

const NineAudioLive = () => {
     const { profile } = useProfile();
    
      if (!profile) {
        return <Text>Loading Profile...</Text>;
      }
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
         flex: 1,
      // paddingHorizontal: 10,
      // justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      
      {/* First Slot - User Image */}
      <View key="user" style={{
        width: '20%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 10,
      }}>
        <Image
                     source={{ uri: profile.avatar_url }}
                     style={{ width: 60, height: 60, borderRadius: 100 }}
                      resizeMode="fit" 
                   />
      </View>

      {/* Remaining 8 Slots - Gradient Chairs */}
      {Array.from({ length: 8 }).map((_, index) => (
        <View key={`chair-${index}`} style={{
          width: '20%',
          // aspectRatio: 1,
          // justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.04)', 'rgba(0, 0, 0, 0.25)']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="chair" size={30} color="#D9D9D9" />
          </LinearGradient>
        </View>
      ))}
    </View>
  );
};

export default NineAudioLive;
