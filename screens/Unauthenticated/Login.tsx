import React, { useContext, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { styles } from "../../styles";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamsList } from '../../navigation/AuthStack';
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../navigation/AuthProvider";
import {Video} from 'expo-av';

type LoginProps = StackScreenProps<AuthStackParamsList, 'Login'>;
export default function Login(props: LoginProps) {
    const [userText, setUserText] = useState("");
    const [passText, setPassText] = useState("");
    const { login } = useContext(AuthContext)
    return (
        <SafeAreaView style={styles.container}>
                <Video
                    source={require('../../assets/LandingPage/landingVideo.mp4')}
                    style={styles.landingVideo}
                    isLooping
                    shouldPlay
                    resizeMode="cover"
                />
                <View style={styles.loginContainer}>
                    
                    <TextInput 
                        mode="outlined" 
                        label="Username" 
                        value={userText} 
                        onChangeText={userText => setUserText(userText)} 
                        autoComplete={false}
                        style={styles.input}
                        autoCapitalize={"none"}
                    />
                    <TextInput 
                        mode="outlined" 
                        label="Password" 
                        value={passText} 
                        onChangeText={passText => setPassText(passText)} 
                        autoComplete={false}
                        style={styles.input}
                        secureTextEntry={true}
                        autoCapitalize={"none"}
                    />
                </View>
                <View style={styles.loginContainer2}>
                    <Button mode="contained" style={styles.button} onPress={() => login(userText, passText)}> Log In</Button>
                    <Button mode="contained" style={styles.button} onPress={() => props.navigation.navigate("Landing")}> Back</Button>
                </View>
                
        </SafeAreaView>
    )
}
