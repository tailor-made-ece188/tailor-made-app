import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProfileScreen from "../screens/Authenticated/Profile";
import OutfitScreen from "../screens/Authenticated/Outfit";
import { UploadedPicture } from '../config/types';
import { PRIMARY_COLOR } from '../styles';

export type ProfileStackParamList = {
    ProfilePage: undefined;
    Outfit: { pic: UploadedPicture }
  };

export default function ProfileStack(){
const Profile = createStackNavigator<ProfileStackParamList>();
return(
    <Profile.Navigator initialRouteName='ProfilePage' >
        <Profile.Screen
            name='ProfilePage'
            component={ProfileScreen}
            options={{cardStyle: {
                backgroundColor: PRIMARY_COLOR,
              }
            }}
        />
        <Profile.Screen
            name="Outfit"
            component={OutfitScreen}
            options={({ route }) => ({ title: route.params.pic.image_name })}
        />
    </Profile.Navigator>
)
}