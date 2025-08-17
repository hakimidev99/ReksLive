import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SixMultiGuestLive = () => {
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      height: '80%',
    }}>
      {/* Slot 1 - Large */}
      <View style={{
        backgroundColor: 'black',
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
      }}>
       {/* Camera should be here */}
      </View>

      {/* Slot 2 */}
      <View style={styles.slot}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
      </View>

      {/* Slot 3 */}
      <View style={styles.slot}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
      </View>

      {/* Slot 4 */}
      <View style={styles.slot}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
      </View>

      {/* Slot 5 */}
      <View style={styles.slot}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
      </View>

      {/* Slot 6 */}
      <View style={styles.slot}>
          <MaterialIcons name="chair" size={30} color="#D9D9D9" />
      </View>
    </View>
  );
};

const styles = {
  slot: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    width: '50%',
    height: '20%', // Remaining height divided among 5 slots
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default SixMultiGuestLive;
