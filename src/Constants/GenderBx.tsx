import { View, Text, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native'
import React, { ReactNode } from 'react'

type GenderBxProps = {
  icon?: ReactNode;
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
};
const GenderBx: React.FC<GenderBxProps> = ({
   icon= null,
   text ="",
   style ={},
   textStyle={},

   onPress = ()=> {},
}) => {
    
  return (
              <View
                  style={{
                    width:90,
                    height:70,
                     backgroundColor:"rgba(217,217,217,0.2)",
                     borderRadius:10,
                    justifyContent:"center" ,
                     alignItems:"center",
                     padding:10,
                     ...style
                  }} onTouchEnd={onPress}>
                      {icon}
                       <Text style={{
                        textAlign:"center",
          
                         marginTop:2, fontFamily:"Poppins-Medium", fontSize:14, ...textStyle}} > {text}</Text>
                  </View>
  )
}

export default GenderBx