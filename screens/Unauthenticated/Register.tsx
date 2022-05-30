import React, {useState, useContext} from "react";
import { SafeAreaView, View, Text, Alert, Image } from "react-native";
import { PRIMARY_COLOR, styles } from "../../styles";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamsList } from '../../navigation/AuthStack';
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../../navigation/AuthProvider";
import {Video} from 'expo-av';

type RegisterProps = StackScreenProps<AuthStackParamsList, 'Register'>;
export default function Register(props: RegisterProps) {
    const [userText, setUserText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [passText, setPassText] = useState("");
    const [verifyPass, setVerifyPass] = useState("");
    const { register } = useContext(AuthContext);
    async function attemptRegister(){
        if (verifyPass !== passText){
            Alert.alert(
                "Passwords Don't Match",
                "Please input matching passwords.",
                [
                    {
                        text: "Ok."
                    }
                ]
            )
        }
        else {
            Alert.alert(
                "Register",
                "Are you sure you want to sign up?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Sign Up",
                        onPress: () => register({
                            username: userText,
                            password: passText,
                            email: emailText
                        })
                    }
                ]
            )
        }
    }
    return (
        <SafeAreaView style={styles.container}>
                
                <Image
                    style={styles.landingImage3}
                    source={require('../../assets/LandingPage/logoName2.png')}
                />
                <View style={styles.registerContainer}>
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
                        label="Email" 
                        value={emailText} 
                        onChangeText={emailText => setEmailText(emailText)} 
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
                    <TextInput 
                        mode="flat" 
                        label="Verify Password" 
                        value={verifyPass} 
                        onChangeText={passText => setVerifyPass(passText)} 
                        autoComplete={false}
                        style={styles.input}
                        secureTextEntry={true}
                        autoCapitalize={"none"}
                    />
                </View>

                <Button mode="contained" color="#fff" contentStyle={styles.buttonInner} labelStyle={{ color: PRIMARY_COLOR, fontSize: 15 }} style={styles.button} onPress={() => attemptRegister()}> Register</Button>

                <Button mode="text" contentStyle={styles.buttonInner} labelStyle={{ color: PRIMARY_COLOR, fontSize: 15 }} style={styles.buttonBack} onPress={() => props.navigation.navigate("Landing")}> Back</Button>
        </SafeAreaView>
    )
}
