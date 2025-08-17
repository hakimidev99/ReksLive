import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TwelveMultiGuestLive = () => {
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      height: '80%',
    }}>
      {/* Slot 1 - Large Camera View */}
      <View style={{
        backgroundColor: 'black',
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
      }}>
        {/* Camera Component Goes Here */}
      </View>

      {/* Slots 2-12 */}
      {Array.from({ length: 11 }).map((_, index) => (
        <View key={index} style={styles.slot}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
        </View>
      ))}
    </View>
  );
};

const styles = {
  slot: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: '33.33%',  // 3 columns per row
    height: '15%',    // Remaining 60% divided by 4 rows (15% each)
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default TwelveMultiGuestLive;
