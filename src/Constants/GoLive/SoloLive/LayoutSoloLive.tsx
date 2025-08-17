import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import SoloLive from './SoloLive';
import GoLive from '../Golive';
import LiveTitle from '../LiveTitle';
import { useNavigation } from '@react-navigation/native';

const LayoutSoloLive = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Background SoloLive */}
      <SoloLive />

      {/* Overlay LiveTitle */}
      <View style={styles.liveTitleWrapper}>
        <LiveTitle />
      </View>

      {/* Overlay GoLive */}
      <View style={styles.goLiveWrapper}>
        <GoLive
          onChairSelect={() => {}}
          showChairs={false}
          visibleChairs={["solo"]} // a dummy chair to make mapping work
          initialChair="solo"
          goLiveScreens={{
            solo: "SoloLiveScreen", // match the dummy chair title above
          }}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default LayoutSoloLive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  liveTitleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10, // adjust for safe area if needed
    zIndex: 10,
  },
  goLiveWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
