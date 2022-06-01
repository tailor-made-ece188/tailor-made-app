import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Public from "./PublicStack";
import Identify from "../screens/Authenticated/Identify";
import ProfileStack from "./ProfileStack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { styles } from "../styles";

export type HomeStackParamsList = {
    Home: undefined,
    Identify: undefined;
    Profile: undefined
}

export default function HomeStack() {
    const Tab = createMaterialTopTabNavigator<HomeStackParamsList>();
    return (
        <Tab.Navigator initialRouteName="Home" tabBarPosition="bottom" style={styles.bar}>
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
                component={Public}
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
                component={ProfileStack}
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