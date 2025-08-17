import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

type LiveNavigatorProps = {
  title: string;
  isSelected: boolean;
  handlePress: () => void;
  textStyle?: object;
};

const LiveNavigator = ({ title, isSelected, handlePress, textStyle }: LiveNavigatorProps) => {
  return (
    <TouchableOpacity onPress={handlePress} disabled={isSelected}>
      <View style={{ 
        flex: 1,
            zIndex: 10,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
       paddingVertical:10,
       paddingHorizontal:10,
      }}>
        <Text style={[{ fontSize: 12,  fontFamily:"Montserrat-Bold", color: isSelected ? '#000000' : 'rgba(0, 0, 0, 0.3)' }, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LiveNavigator;
