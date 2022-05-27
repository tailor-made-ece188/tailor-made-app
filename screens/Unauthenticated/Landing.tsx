import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { styles } from "../../styles";
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamsList } from '../../navigation/AuthStack'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import {Video} from 'expo-av';
type LandingProps = StackScreenProps<AuthStackParamsList, 'Landing'>;


export default function Landing(props: LandingProps) {
    
    return (
        <SafeAreaView style={styles.container}>
            <Video
                    source={require('../../assets/LandingPage/landingVideo.mp4')}
                    style={styles.landingVideo}
                    isLooping
                    shouldPlay
                    resizeMode="cover"
                />
            <View style={styles.containerLanding}>
                
                <Image
                    style={styles.landingImage}
                    source={require('../../assets/tailor-made.png')}
                />
                <Button mode="contained" style={styles.button} onPress={() => props.navigation.navigate("Login")}> Log In </Button>
                <Button mode="contained" style={styles.button} onPress={() => props.navigation.navigate("Register")}> Register</Button>
                
            </View>
        </SafeAreaView>
    )
}
