import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProfileScreen from "../screens/Authenticated/Profile";
import OutfitScreen from "../screens/Authenticated/Outfit";

export type ProfileStackParamList = {
    ProfilePage: undefined;
    Outfit: { imageURL: string, imageName: string }
  };

export default function ProfileStack(){
const Profile = createStackNavigator<ProfileStackParamList>();
return(
    <Profile.Navigator initialRouteName='ProfilePage'>
        <Profile.Screen
            name='ProfilePage'
            component={ProfileScreen}
        />
        <Profile.Screen
            name="Outfit"
            component={OutfitScreen}
        />
    </Profile.Navigator>
)
}