import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Chairs = ({
  title = "8",
  isClicked = true,
  handlePress = () => {},
  style = {},
  textStyle = {}
}) => {
  // Define dynamic colors based on isClicked
  const iconColor = isClicked ? "#000000" : "rgba(0, 0, 0, 0.31)";
  const textColor = isClicked ? "#000000" : "rgba(0, 0, 0, 0.31)";
  const backgroundColor = isClicked ? "#D4AF37" : "rgba(255, 255, 255, 0)";

  return (
    <TouchableWithoutFeedback
      {...(!isClicked && { onPress: handlePress })}
    >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 50,
        height: 25,
        gap: 2,
        borderRadius: 50,
        backgroundColor: backgroundColor,
        ...style
      }}>
        <MaterialIcons name="chair" size={20} color={iconColor} />
        <Text style={{
          fontFamily: "Montserrat-Bold",
          fontSize: 14,
          color: textColor,
          ...textStyle,
        }}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Chairs;
