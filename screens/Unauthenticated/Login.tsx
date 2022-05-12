import React, { useContext, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { styles } from "../../styles";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamsList } from '../../navigation/AuthStack';
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { AuthContext } from "../../navigation/AuthProvider";

type LoginProps = StackScreenProps<AuthStackParamsList, 'Login'>;
export default function Login(props: LoginProps) {
    const [userText, setUserText] = useState("");
    const [passText, setPassText] = useState("");
    const { login } = useContext(AuthContext)
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
                    label="Password" 
                    value={passText} 
                    onChangeText={passText => setPassText(passText)} 
                    autoComplete={false}
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                />
                
                <Button mode="contained" onPress={() => login(userText, passText)}> Log In</Button>
                <Button mode="contained" onPress={() => props.navigation.navigate("Landing")}> Back</Button>
        </SafeAreaView>
    )
}
