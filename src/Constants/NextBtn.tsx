     import { View, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
    import React from 'react'
    
    const NextBtn = ({
      title = "NEXT",
      handlePress = () => {},
      isLoading = false,
      style = {},
      textStyle = {},
      disabled = false,
    }) => {
      return (
        <TouchableWithoutFeedback onPress={disabled || isLoading ? null : handlePress}>
          <View
            style={{
              width: "100%",
              height: 50,
              borderRadius: 100,
              backgroundColor: disabled ? "#ccc" : "#D4AF37",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              marginTop: 30,
              shadowOffset: { width: 9, height: 9 },
              shadowOpacity: 1,
              shadowRadius: 5.84,
              elevation: 5,
              ...style,
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: 14,
                  color: "#fff",
                  ...textStyle,
                }}
              >
                {title}
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      )
    }
    
    export default NextBtn