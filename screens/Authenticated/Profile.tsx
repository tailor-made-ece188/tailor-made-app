import React, {useContext} from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import { styles } from "../../styles";
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { AuthContext } from "../../navigation/AuthProvider";
import { Button } from "react-native-paper"

type ProfileProps = MaterialBottomTabScreenProps<HomeStackParamsList, 'Profile'>;
export default function Profile(props: ProfileProps) {
    const {logout} = useContext(AuthContext);
    function attemptLogout(){
        Alert.alert(
            "Register",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    onPress: () => logout()
                }
            ]
        )
    }
    return (
        <SafeAreaView>
            <View>
                <Text> Our Profile Page!</Text>
                <Button onPress={() => attemptLogout()} mode="contained" >Log Out</Button>
            </View>
        </SafeAreaView>
    )
}
