import { View, Text, Image} from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ActivitiesBtn = () => {
  return (
     <View style={{
                      flexDirection:"row",
                      alignItems:"center",
                      justifyContent:"center",
                      paddingHorizontal:16,
              marginTop:5,
                  marginBottom:5,
                      }}>
                        <Image source={require('@/assets/images/icons/activities.png')} style={{
                          width:30, height:30, }} />
                      <Text style={{
                        flexGrow:1,
                       paddingLeft:8,
                        fontSize:14,
        fontFamily:"Montserrat-Medium",
                      }}>Activities</Text>
                      <MaterialIcons name='arrow-forward-ios' size={24} color={"#000"} />
                    </View>
  )
}

export default ActivitiesBtn