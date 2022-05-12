import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { styles } from "../../styles";
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamsList } from '../../navigation/AuthStack'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

type LandingProps = StackScreenProps<AuthStackParamsList, 'Landing'>;


export default function Landing(props: LandingProps) {
    return (
        <SafeAreaView >
            <View>
                <Button mode="contained" onPress={() => props.navigation.navigate("Login")}> Log In </Button>
                <Button mode="contained" onPress={() => props.navigation.navigate("Register")}> Register</Button>
            </View>
        </SafeAreaView>
    )
}
