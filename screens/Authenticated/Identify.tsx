import React, { useContext, useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import { styles } from "../../styles";;
import * as ImagePicker from 'expo-image-picker';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../../navigation/AuthProvider";
import {uploadImage} from "../../db/firebaseFunctions";
type IdentifyProps = MaterialBottomTabScreenProps<HomeStackParamsList, 'Identify'>;
import { grabUserImages } from "../../db/mongoFunctions";
import { Camera, CameraType } from 'expo-camera';
import { withNavigationFocus } from "react-navigation";
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';


export default function Identify(props: IdentifyProps) {
    const [selected, setSelected] = useState(false);
    const [snap, setSnapped] = useState(true);
    const [imURI, setImURI] = useState("");
    const {user, userToken, setUserPics} = useContext(AuthContext);
    const [imageName, setImageName] = useState("");
    const cameraRef =useRef<null | Camera>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 0.6,
            //base64: true
    });
        console.log(result);
        if (!result.cancelled){
            //console.log(result.base64);
            const compressedImage = await manipulateAsync(result.uri, undefined, {
                compress : 0.7
            });

            setImURI(compressedImage.uri);
            setSelected(true);
            setSnapped(true);
        }

    }
    const attemptUpload = async(imageName: string) =>{
        console.log(user);
        if(!user || !imURI ) console.error("upload failed");
        if(!user) return;
        if(!imURI) return;
        // function _base64ToArrayBuffer(base64 : string) {
        //     var binary_string = Buffer.from(base64,'base64');
        //     return binary_string;
        // }
        const res = await uploadImage(user, userToken, imageName, imURI);
        grabUserImages(userToken).then(images => {
            //console.log(images);
            setUserPics(images);
          })
        if(res){
            setImURI("");
            
        }
        setSelected(false);
    }
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
        // (async () => {
        // const { status } = await Camera.requestCameraPermissionsAsync();
        // setHasPermission(status === 'granted');
        // })();
    }, []);
    async function requestCamera(){
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    }
    

    const __takePicture = async () => {
        if (cameraRef && cameraRef.current){
            const photo = await cameraRef.current.takePictureAsync();
            console.log(photo);
            const compressedImage = await manipulateAsync(photo.uri, undefined, {
                compress : 0.7
            });
            setImURI(compressedImage.uri);
            setSelected(true);
            setSnapped(true);
        }
        else {
            console.log("No camera ref!");
        }
        // // if (cameraRef===null || cameraRef.current==null) {
        //     return
        // }
        // else
        // {
        //     // const photo = await cameraRef.takePictureAsync();
        //     // setSnapped(false);
        //     // setImURI(photo.uri);
        //     // setSelected(false)
        //     // console.log("snapped picture")  

        // }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cameraContainer}>
                { (!selected && hasPermission) 
                ?
                <Camera     
                    type={type} style={styles.camera} ref={cameraRef} > 
                <View >
                    
                    <TouchableOpacity onPress={__takePicture} style={styles.cameraCapture}>

                    </TouchableOpacity>
                    </View>
                </Camera> 
                : 
                 !hasPermission ? <Button onPress={async () => await requestCamera()} mode="text">Request Camera Permission</Button> : null
                }
                <TouchableOpacity
                        onPress={() => {
                        setType(type === CameraType.back ? CameraType.front : CameraType.back);
                        }}>
                        <Text style={styles.cameraFlip}> Flip </Text>
                    </TouchableOpacity>
                
                {
                    snap && imURI ?  
                    <View style={styles.identifyContainer}>
                            <Image source = {{uri: imURI }} style={styles.uploadImage} />
                            <TextInput 
                                mode="flat" 
                                label="Image Name" 
                                value={imageName} 
                                onChangeText={imageName => setImageName(imageName)} 
                                autoComplete={false}
                                style={styles.input}
                                autoCapitalize={"none"}
                            />
                        <Button mode="text" contentStyle={styles.identifyButton2} onPress={() => attemptUpload(imageName)} >Upload</Button>
                    </View>
                    : 
                    selected ? <View style={styles.identifyContainer}>
                    <Image source = {{uri: imURI}} style={styles.uploadImage} /> 
                    <TextInput 
                        mode="flat" 
                        label="Image Name" 
                        value={imageName} 
                        onChangeText={imageName => setImageName(imageName)} 
                        autoComplete={false}
                        style={styles.input}
                        autoCapitalize={"none"}
                    />
                    <Button mode="text" contentStyle={styles.identifyButton2} onPress={() => attemptUpload(imageName)} >Upload</Button>
                </View> : null
                }
                <Button mode="text" onPress={pickImage} contentStyle={styles.identifyButton2} style={styles.identifyButton}>Select Image</Button>
            </View>
        </SafeAreaView>
    )
}
