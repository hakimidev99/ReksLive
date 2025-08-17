import { View, Text, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LiveTitle from '../Constants/GoLive/LiveTitle';
import GoLive from '../Constants/GoLive/Golive';
import LayoutSoloLive from '../Constants/GoLive/SoloLive/LayoutSoloLive';
import LayoutMultiGuest from '../Constants/GoLive/MultiGuestLive/LayoutMultiGuest';
import LayoutAudioLive from '../Constants/GoLive/AudioLive/LayoutAudioLive';
import LiveNav from '../Constants/GoLive/LiveNav';
import Dot from '../Constants/Dot';

type LiveNavigatorKey = "Multi-guest LIVE" | "Solo LIVE" | "Audio LIVE";

const Golive = () => {
  const [selectedLiveNavigator, setSelectedLiveNavigator] = useState<LiveNavigatorKey | "">("");

  const liveNavigatorComponents: Record<LiveNavigatorKey, React.ComponentType> = {
    "Multi-guest LIVE": LayoutMultiGuest,
    "Solo LIVE": LayoutSoloLive,
    "Audio LIVE": LayoutAudioLive,
  };

  const SelectedLiveNavigatorComponent = selectedLiveNavigator
    ? liveNavigatorComponents[selectedLiveNavigator as LiveNavigatorKey]
    : null;

  return (
    // <ImageBackground
    //   source={require("../assets/images/GoLiveBackGround.png")}
    //   style={{
    //     width: '100%',
    //     height: '100%',
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     position: 'relative',
    //   }}
    // >
      <SafeAreaView
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          position: "relative",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Padding applies only to LiveTitle */}
       
        <LiveNav onLiveNavigator={(liveTitle: LiveNavigatorKey | "") => setSelectedLiveNavigator(liveTitle)} />

        {SelectedLiveNavigatorComponent && <SelectedLiveNavigatorComponent />}

        <Dot size={8} color="black" style={{ position: 'absolute', bottom: 10 }} />
      </SafeAreaView>
    // </ImageBackground>
  );
};

export default Golive;
