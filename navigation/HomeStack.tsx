import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import Home from "../screens/Authenticated/Home";
import Identify from "../screens/Authenticated/Identify";
import Profile from "../screens/Authenticated/Profile";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export type HomeStackParamsList = {
    Home: undefined,
    Identify: undefined;
    Profile: undefined
}

export default function HomeStack() {
    const Tab = createMaterialBottomTabNavigator<HomeStackParamsList>();
    return (
        <Tab.Navigator initialRouteName="Home"
        barStyle={{backgroundColor: "#FE5F55"}}>
            <Tab.Screen
                name="Identify"
                component={Identify}
                options={{
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons
                        name="magnify"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
            />
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                      <MaterialIcons
                        name="home"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                      <FontAwesome
                        name="user"
                        color={color}
                        size={26}
                      />
                    ),
                  }}
            />
        </Tab.Navigator>
    );
}