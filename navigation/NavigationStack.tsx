
import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "./AuthProvider";
import { ActivityIndicator } from "react-native";
import { AuthProvider } from "./AuthProvider";


export default function NavigationStack(){
    return (
        <AuthProvider>
            <NavigationStackContent />
        </AuthProvider>
    )
}

 function NavigationStackContent() {
    const { isValidToken } = useContext(AuthContext);
    // const [initializing, setInitializing] = useState(true);
    // const [loading, setLoading] = useState(false); // useState(true) after we set up user state change handler

    // if (loading) {
    //     return <ActivityIndicator />;
    // }
    return (
            <NavigationContainer>
                {/* {true ? isProfile ? <ProfileStack/>:<HomeStack /> : <AuthStack />} */}
                {isValidToken ? <HomeStack /> : <AuthStack />}
            </NavigationContainer>
    );
}