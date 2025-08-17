import React from 'react';
import { View } from 'react-native';

const Dot = ({ size = 10, color = 'black' , style={}}) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        position: 'absolute',
        bottom: 20,
        borderRadius: size / 2,
        backgroundColor: color,
        
      }}
    />
  );
};

export default Dot;
