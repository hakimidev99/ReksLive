import { View } from 'react-native';
import React, { useState } from 'react';
import LiveTitle from '../LiveTitle';
import NineAudioLive from './NineAudioLive';
import TwelveAudioLive from './TwelveAudioLive';
import GoLive from '../Golive';
import { useNavigation } from '@react-navigation/native';

const LayoutAudioLive = () => {
  const navigation = useNavigation();
  const [selectedScreen, setSelectedScreen] = useState<"9" | "12">("9");

  const screenComponents = {
    "9": NineAudioLive,
    "12": TwelveAudioLive,
  };

  const SelectedComponent = screenComponents[selectedScreen] || null;

  return (
    <>
      <View style={{ paddingHorizontal: 20, width: '100%' }}>
        <LiveTitle />
      </View>

      <View style={{
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        paddingHorizontal: 20,
      }}>
        {SelectedComponent && <SelectedComponent />}

        <GoLive
          onChairSelect={(screenTitle) => setSelectedScreen(screenTitle as "9" | "12")}
          visibleChairs={['9', '12']}
          initialChair={selectedScreen}
          showIcons={true}
          goLiveScreens={{
            "9": "NineAudioLiveSetup",
            "12": "TwelveAudioLiveSetup",
          }}
          navigation={navigation}
        />
      </View>
    </>
  );
};

export default LayoutAudioLive;
