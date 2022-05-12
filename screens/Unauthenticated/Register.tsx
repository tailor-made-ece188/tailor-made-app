import React, {useState, useContext} from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { styles } from "../../styles";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamsList } from '../../navigation/AuthStack';
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../../navigation/AuthProvider";


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
        <SafeAreaView>
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
                    label="Email" 
                    value={emailText} 
                    onChangeText={emailText => setEmailText(emailText)} 
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
                <TextInput 
                    mode="outlined" 
                    label="Verify Password" 
                    value={verifyPass} 
                    onChangeText={passText => setVerifyPass(passText)} 
                    autoComplete={false}
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                />

                <Button mode="contained" onPress={() => attemptRegister()}> Register</Button>

                <Button mode="contained" onPress={() => props.navigation.navigate("Landing")}> Back</Button>
        </SafeAreaView>
    )
}
