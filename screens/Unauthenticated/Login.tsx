import React, { useContext, useState } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { PRIMARY_COLOR, styles } from "../../styles";
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
                
                <Image
                    style={styles.landingImage3}
                    source={require('../../assets/LandingPage/logoName2.png')}
                />
                <View style={styles.loginContainer}>
                    
                    <TextInput 
                        mode="flat"
                        label="Username" 
                        value={userText} 
                        onChangeText={userText => setUserText(userText)} 
                        autoComplete={false}
                        style={styles.input}
                        autoCapitalize={"none"}
                        
                    />
                    <TextInput 
                        mode="flat" 
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
                    <Button mode="contained"  color="#fff" contentStyle={styles.buttonInner} labelStyle={{ color: PRIMARY_COLOR, fontSize: 15 }} style={styles.button} onPress={() => login(userText, passText)}> Log In</Button>
                    <Button mode="text"  color="#fff" contentStyle={styles.buttonInner} labelStyle={{ color: PRIMARY_COLOR, fontSize: 15 }} style={styles.buttonBack} onPress={() => props.navigation.navigate("Landing")}> Back</Button>
                </View>
                
        </SafeAreaView>
    )
}
