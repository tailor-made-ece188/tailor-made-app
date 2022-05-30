import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { PRIMARY_COLOR, styles } from "../../styles";
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamsList } from '../../navigation/AuthStack'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import {Video} from 'expo-av';
type LandingProps = StackScreenProps<AuthStackParamsList, 'Landing'>;


export default function Landing(props: LandingProps) {
    
    return (
        <SafeAreaView style={styles.container}>
            {/* <Video
                    source={require('../../assets/LandingPage/landingVideo.mp4')}
                    style={styles.landingVideo}
                    isLooping
                    shouldPlay
                    resizeMode="cover"
                /> */}
            
            {/* <View style={styles.landingSquare3}></View>
            <View style={styles.landingSquare4}></View>
            <View style={styles.landingSquare1}></View>
            <View style={styles.landingSquare2}></View> */}
            <View style={styles.containerLanding}>
                
                <Image
                    style={styles.landingImage}
                    source={require('../../assets/tailor-made3.png')}
                />
                <Image
                    style={styles.landingImage2}
                    source={require('../../assets/LandingPage/logoName2.png')}
                />
                
                <Button mode="contained" color="#fff" labelStyle={{ color: PRIMARY_COLOR, fontSize: 15 }} contentStyle={styles.buttonInner} style={styles.button} onPress={() => props.navigation.navigate("Login")}> Log In </Button>
                <Button mode="contained" color="#fff" labelStyle={{ color: PRIMARY_COLOR, fontSize: 15 }} contentStyle={styles.buttonInner} style={styles.button} onPress={() => props.navigation.navigate("Register")}> Create Account</Button>
                
            </View>
        </SafeAreaView>
    )
}
