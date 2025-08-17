import { View, Animated, Dimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LiveNavigator from './LiveNavigator';
import Dot from '../Dot';
const LiveNav = ({ onLiveNavigator }) => {
  const liveData = [
    { title: "Multi-guest LIVE" },
    { title: "Solo LIVE" },
    { title: "Audio LIVE" },
  ];

  const [selectedLive, setSelectedLive] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    onLiveNavigator(liveData[selectedLive].title);
    animateContainer(selectedLive);
  }, []);

  const handleLiveNavPress = (index) => {
    setSelectedLive(index);
    onLiveNavigator(liveData[index].title);
    animateContainer(index);
  };

  const animateContainer = (index) => {
    let toValue = 0; // Default Center
    if (index === 0) {
      toValue = screenWidth * 0.2; // Move Right
    } else if (index === 1) {
      toValue = screenWidth * -0.05; // Center
    } else if (index === 2) {
      toValue = -screenWidth * 0.25; // Move Left
    }

    Animated.spring(translateX, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  return (
    <><Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 10,
            zIndex: 10,
        transform: [{ translateX }],
      }}
    >
      {liveData.map((live, index) => (
        <LiveNavigator
          key={index}
          title={live.title}
          isSelected={selectedLive === index}
          handlePress={() => handleLiveNavPress(index)}
        />
      ))}
    </Animated.View>
     
    </>
    
  );
};

export default LiveNav;
