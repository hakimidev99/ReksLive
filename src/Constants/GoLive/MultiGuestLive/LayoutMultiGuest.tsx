import { View } from 'react-native';
import React, { useState } from 'react';
import FourMultiGuestLive from './FourMultiGuestLive';
import SixMultiGuestLive from './SixMultiGuestLive';
import NineMultiGuestLive from './NineMultiGuestLive';
import TwelveMultiGuestLive from './TwelveMultiGuestLive'; 
import GoLive from '../Golive';
import LiveTitle from '../LiveTitle'

type ScreenKey = "4" | "6" | "9" | "12";

const LayoutMultiGuest = () => {
  const [selectedScreen, setSelectedScreen] = useState<ScreenKey>("4"); // default screen here (like "6", "9", "12")

  const screenComponents: Record<ScreenKey, React.ComponentType> = {
    "4": FourMultiGuestLive,
    "6": SixMultiGuestLive,
    "9": NineMultiGuestLive,
    "12": TwelveMultiGuestLive,
  };

  const SelectedComponent = selectedScreen ? screenComponents[selectedScreen] : null;

  return (
    <>
      <View style={{ paddingHorizontal: 20, width: '100%' }}>
        <LiveTitle />
      </View>
      <View style={{
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
        {SelectedComponent && <SelectedComponent />}
        <GoLive
          onChairSelect={(screenTitle) => setSelectedScreen(screenTitle as ScreenKey)}
          visibleChairs={["4","6", "9", "12"]}  // customize visible chairs
          initialChair={selectedScreen}     // pass the initial chair
        />
      </View>
    </>
  );
};

export default LayoutMultiGuest;
