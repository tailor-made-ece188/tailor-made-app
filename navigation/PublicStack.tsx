import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PublicScreen from "../screens/Authenticated/Public";
import OutfitScreen from "../screens/Authenticated/Outfit";
import { UploadedPicture } from '../config/types';
import { PRIMARY_COLOR } from '../styles';

export type PublicStackParamList = {
    Public: undefined;
    Outfit: { pic: UploadedPicture }
  };

export default function PublicStack(){
const Public = createStackNavigator<PublicStackParamList>();
return(
    <Public.Navigator initialRouteName='Public' >
        <Public.Screen
            name='Public'
            component={PublicScreen}
            options={{cardStyle: {
                backgroundColor: PRIMARY_COLOR,
              }
            }}
        />
        <Public.Screen
            name="Outfit"
            component={OutfitScreen}
            options={({ route }) => ({ title: route.params.pic.image_name })}
        />
    </Public.Navigator>
)
}