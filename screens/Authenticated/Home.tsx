import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import { styles } from "../../styles";

import type { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";

type HomeProps = MaterialBottomTabScreenProps<HomeStackParamsList, 'Home'>;

export default function Home(props: HomeProps) {
    return (
        <SafeAreaView>
            <View>
                <Text> Our Home Page!</Text>
            </View>
        </SafeAreaView>
    )
}
