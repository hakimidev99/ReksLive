import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Chairs from './Chairs';
import NextBtn from '../NextBtn';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface GoLiveProps {
  onChairSelect: (chairTitle: string) => void;
  showChairs?: boolean;
  visibleChairs?: string[];
  showIcons?: boolean;
  initialChair?: string;
  goLiveScreens?: Record<string, string>; // mapping: chair title -> screen name
  navigation?: any;
}

const GoLive: React.FC<GoLiveProps> = ({
  onChairSelect,
  showChairs = true,
  visibleChairs = [],
  showIcons = true,
  initialChair,
  goLiveScreens = {},
  navigation,
}) => {
  const chairData = [
    { title: "4" },
    { title: "6" },
    { title: "9" },
    { title: "12" },
  ];

  const filteredChairs =
    visibleChairs.length > 0
      ? chairData.filter((chair) => visibleChairs.includes(chair.title))
      : chairData;

  const initialIndex =
    initialChair && filteredChairs.length > 0
      ? filteredChairs.findIndex((chair) => chair.title === initialChair)
      : 0;

  const [selectedChair, setSelectedChair] = useState(
    filteredChairs.length > 0 && initialIndex !== -1 ? initialIndex : 0
  );

  useEffect(() => {
    // Only call onChairSelect if there are chairs to choose from
    if (showChairs && filteredChairs.length > 0) {
      onChairSelect(filteredChairs[selectedChair].title);
    }
  }, [showChairs, visibleChairs]);

  const handleChairPress = (index: number) => {
    setSelectedChair(index);
    onChairSelect(filteredChairs[index].title);
  };

  const handleGoLivePress = () => {
    if (filteredChairs.length > 0) {
      // Normal case: chairs exist
      const selectedTitle = filteredChairs[selectedChair].title;
      if (navigation && goLiveScreens[selectedTitle]) {
        navigation.navigate(goLiveScreens[selectedTitle]);
      }
    } else {
      // Single-screen mode: no chairs
      const firstKey = Object.keys(goLiveScreens)[0];
      if (firstKey && navigation) {
        navigation.navigate(goLiveScreens[firstKey]);
      }
    }
  };

  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      {/* Show chair selection only if enabled and chairs exist */}
      {showChairs && filteredChairs.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {filteredChairs.map((chair, index) => (
            <Chairs
              key={index}
              title={chair.title}
              isClicked={selectedChair === index}
              handlePress={() => handleChairPress(index)}
            />
          ))}
        </View>
      )}

      {/* Conditional Icons + Go Live Button */}
      {showIcons && (
        <View
          style={{
            paddingHorizontal: 40,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <FontAwesome5 name="mask" size={24} color="#000" />
          <NextBtn
            title="Go LIVE"
            style={{
              width: 150,
              position: 'relative',
              bottom: 25,
            }}
            handlePress={handleGoLivePress}
          />
          <FontAwesome6 name="wand-magic-sparkles" size={24} color="#000" />
        </View>
      )}
    </View>
  );
};

export default GoLive;
