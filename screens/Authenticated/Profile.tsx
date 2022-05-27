import React, {useContext, useState} from "react";
import { SafeAreaView, View, Text, Alert, Image, ScrollView } from "react-native";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import { styles } from "../../styles";
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { AuthContext } from "../../navigation/AuthProvider";
import { Button } from "react-native-paper"
import { UploadedPicture, UserProfile} from "../../config/types";
//This doesnt work on Android
//import { TouchableOpacity } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {deleteUploadedImage} from "../../db/firebaseFunctions";
import * as ImagePicker from 'expo-image-picker';
import { grabUserImages } from "../../db/mongoFunctions";

type ProfileProps = MaterialBottomTabScreenProps<HomeStackParamsList, 'Profile'>;
export default function Profile(props: ProfileProps) {
    const {logout, userPics, setUserPics } = useContext(AuthContext);
    
    function attemptLogout(){
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    onPress: () => logout()
                }
            ]
        )
    }
    
    const PicIcons = userPics.map(pic=> (<PicItem pic={pic} key={pic.image_name} />));
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}></View>
            <View style={styles.profileContainer3}>
                
                <Text style={styles.profileTitleText}>Profile</Text>
                <Button style={styles.profileLogoutButton}onPress={() => attemptLogout()} mode="contained" >Log Out</Button>
                <Text style={styles.profileSubtitleText}>Your Uploaded Pics</Text>
                <ScrollView style={styles.profileContainer2}>{PicIcons}</ScrollView>
            </View>
        </SafeAreaView>
    )
}

interface PicItemProps {
    pic: UploadedPicture,
    
}
function PicItem(props: PicItemProps){
    const {user, userToken, setUserPics} = useContext(AuthContext);
    function attemptDelete(pic: UploadedPicture){
        if(!user) return;
        Alert.alert(
            "Delete Image",
            "Are you sure you want to delete the selected image?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Confirm",
                    //onPress: () =>{}
                    
                    onPress: async () => {
                        await deleteUploadedImage(user, userToken, props.pic.image_name);
                        grabUserImages(userToken).then(images => {
                            console.log(images);
                            setUserPics(images);
                          })
                    }
                }
            ]
        )
    }
    function attemptClassify(pic: UploadedPicture){
        Alert.alert(
            "Classify",
            "Are you sure you want to classify this image?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Classify",
                    onPress: () => {}
                }
            ]
        )
    }
    return(
        <View style={styles.profileContainer}>
            
            
            <View >
                <TouchableOpacity 
                activeOpacity={0.9}
                onPress={() => {
                   attemptClassify(props.pic)
                }}
                    onLongPress={() => attemptDelete(props.pic)}>
                <Image style={styles.fitImage}  source={{
                    uri: props.pic.uploaded_image
                }
                } />
                </TouchableOpacity>
                {
                    props.pic.segmented_image  && <Image style={styles.fitImage} source={{
                        uri: props.pic.segmented_image
                    }
                    } />
                }
            </View>
            <Text style={styles.profileText}>{props.pic.image_name}</Text>
        </View>
    )
}