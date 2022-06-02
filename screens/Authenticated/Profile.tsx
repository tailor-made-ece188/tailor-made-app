import React, {useContext, useState} from "react";
import { SafeAreaView, View, Text, Alert, Image, ScrollView } from "react-native";
import {ProfileStackParamList} from "../../navigation/ProfileStack";
import { PRIMARY_COLOR, styles } from "../../styles";
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { AuthContext } from "../../navigation/AuthProvider";
import { Button } from "react-native-paper";
import { UploadedPicture, UserProfile} from "../../config/types";
//This doesnt work on Android
//import { TouchableOpacity } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {deleteUploadedImage} from "../../db/firebaseFunctions";
import * as ImagePicker from 'expo-image-picker';
import { grabUserImages, findAssociatedProducts, classifyImage, updatePublicValue } from "../../db/mongoFunctions";
import { ActivityIndicator, Colors, Modal, Portal, Provider } from 'react-native-paper';


function findImage(pics: UploadedPicture[], imageName: string){
    for (const pic of pics){
        if (pic.image_name === imageName)
            return pic;
    }
    return false;
}

type ProfileProps = MaterialBottomTabScreenProps<ProfileStackParamList, 'ProfilePage'>;
export default function Profile(props: ProfileProps) {
    const [isLoading, setIsLoading] = useState(false);
    const {logout, userPics, setUserPics, user } = useContext(AuthContext);
    function moveToOutfitPage(pic: UploadedPicture){
        props.navigation.navigate('Outfit', {
            pic: pic
        })
    }
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
    
    const PicIcons = userPics.map(pic=> (<PicItem pic={pic} key={pic.image_name} moveToOutfitPage={moveToOutfitPage} setIsLoading={setIsLoading} />));
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.profileSquare1}></View>
                <View style={styles.profileSquare2}></View>
                
                <View style={styles.profileContainer3}>
                    <Text style={styles.profileTitleText}>{user?.username}</Text>
                    <Button color={PRIMARY_COLOR} labelStyle={{ color: '#fff', fontSize: 12 }} contentStyle={styles.buttonBackInner} style={styles.profileLogoutButton}onPress={() => attemptLogout()} mode="contained" >Log Out</Button>
                    <Text style={styles.profileSubtitleText}>Your Pictures</Text>
                    { isLoading ? <LoadingModal/> :
                    <ScrollView >{PicIcons}</ScrollView>
    }
                </View>
        </SafeAreaView>
    )
}

interface PicItemProps {
    pic: UploadedPicture,
    moveToOutfitPage: (pic: UploadedPicture) => void
    setIsLoading: (val : boolean) => void
}
export function PicItem(props: PicItemProps){
    const [currPublic, setCurrPublic] = useState(props.pic.public ?? 'false');
    const {user, userToken, setUserPics} = useContext(AuthContext);
    const isSameUser = user?.uid == props.pic.uid;
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
                            //console.log(images);
                            setUserPics(images);
                          })
                    }
                }
            ]
        )
    }
    function attemptTogglePublic(pic: UploadedPicture){
        if(currPublic){
            Alert.alert(
                "Privatize",
                "Are you sure you want to privatize this outfit?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Privatize",
                        onPress: async () => {
                            await updatePublicValue(pic.image_name, false, userToken);
                            setCurrPublic(false);
                        }
                    }
                ]
            )
        }
        else {
            Alert.alert(
                "Publicize",
                "Are you sure you want to publicize this outfit?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Publicize",
                        onPress: async () => {
                            await updatePublicValue(pic.image_name, true, userToken);
                            setCurrPublic(true);
                        }
                    }
                ]
            )
        }
    }

    return(
        <View style={styles.profileContainer}>
            <View >
            {    isSameUser && 
                <TouchableOpacity style = {styles.publicToggle} onPress={() => attemptTogglePublic(props.pic)}>
                    <MaterialCommunityIcon name="account-multiple" size={50} color={ currPublic ? PRIMARY_COLOR : "white"} style={{
                        backgroundColor: "transparent",
                        width: 50,
                        borderRadius: 5
                        
                    }}/>
                </TouchableOpacity>
            }
                <TouchableOpacity 
                activeOpacity={0.9}
                onPress={async () => {
                    if(props.pic.categoryNames && props.pic.similarClothes && props.pic.segmented_image)
                        props.moveToOutfitPage(props.pic);
                    else {
                        //alert("Please wait, getting related clothes! May take 30 seconds. Sit tight!");
                        props.setIsLoading(true);
                        const associatedRes = await findAssociatedProducts(props.pic.image_name, userToken);
                        const classifyRes = await classifyImage(props.pic.image_name, userToken);
                        if(!classifyRes){
                            alert("Error, model server did not work!");
                        }
                        if(!associatedRes){
                            alert("Error, backend server could not get images!");
                        }
                            const newImages= await grabUserImages(userToken);
                            const newImage = findImage(newImages,props.pic.image_name);
                            setUserPics(newImages);
                            if(newImage){
                                props.setIsLoading(false);
                                props.moveToOutfitPage(newImage);
                            }
                            else {
                                alert("Error getting information!");
                                props.setIsLoading(false);
                            }
                        
                    }
                }}
                    onLongPress={() => {
                        if(isSameUser)
                        attemptDelete(props.pic)
                    }}>
                <Image style={styles.fitImage}  source={{
                    uri: props.pic.uploaded_image
                }
                } />
                </TouchableOpacity>

            </View>
            <Text style={styles.profileText}>{props.pic.image_name}</Text>
        </View>
    )
}

function LoadingModal(){
    return(
        <View>
            <Image
                    style={styles.landingImage}
                    source={require('../../assets/tailor-made3.png')}
                />
            <ActivityIndicator animating={true} color={Colors.red800} />
            <Text>Sit tight, our tailors are at work finding the best clothes for you!</Text> 
        </View>
    )
}