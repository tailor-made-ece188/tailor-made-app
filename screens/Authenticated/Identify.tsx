import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import { styles } from "../../styles";
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'

type IdentifyProps = MaterialBottomTabScreenProps<HomeStackParamsList, 'Identify'>;


export default function Identify(props: IdentifyProps) {
    return (
        <SafeAreaView>
            <View>
                <Text> Our Identify Page!</Text>
            </View>
        </SafeAreaView>
    )
}
