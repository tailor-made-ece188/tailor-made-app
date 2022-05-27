import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../screens/Unauthenticated/Landing";
import Login from "../screens/Unauthenticated/Login";
import Register from "../screens/Unauthenticated/Register";

export type AuthStackParamsList = {
    Landing: undefined,
    Login: undefined;
    Register: undefined
}


export default function AuthStack() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
                name="Landing"
                component={Landing}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ header: () => null }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    );
}