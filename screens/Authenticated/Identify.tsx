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

// var notSelected = true;

export default function Identify(props: IdentifyProps) {
    const [selected, setSelected] = useState(false);
    const [snap, setSnapped] = useState(true);
    const [imURI, setImURI] = useState("");
    const {user, userToken, setUserPics} = useContext(AuthContext);
    const [image,setImage ] = useState<null | ImagePicker.ImageInfo>(null);
    const [imageName, setImageName] = useState("");
    const [cameraRef, setCameraRef] = useState(null)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
            //base64: true
    });
        console.log(result);
        if (!result.cancelled){
            //console.log(result.base64);
            setImage(result);
            setSelected(true);
            setSnapped(true);
        }

    }
    const attemptUpload = async(imageName: string) =>{
        console.log(user);
        if(!user || !image || image.cancelled ) console.error("upload failed");
        if(!user) return;
        if(!image) return;
        // function _base64ToArrayBuffer(base64 : string) {
        //     var binary_string = Buffer.from(base64,'base64');
        //     return binary_string;
        // }
        const res = await uploadImage(user, userToken, imageName, image);
        grabUserImages(userToken).then(images => {
            //console.log(images);
            setUserPics(images);
          })
        if(res){
            setImage(null);
            
        }
        setSelected(false);
    }
    const [hasPermission, setHasPermission] = useState<any|null>(null);
    const [type, setType] = useState(CameraType.back);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);
    

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    const __takePicture = async () => {
        
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
                {/* <Text> Our Identify Page!</Text> */}
                { !selected &&
                    <Camera  
                        
                        type={type} style={styles.camera}>
                    <View >
                    
                    <TouchableOpacity onPress={()=>{__takePicture}} style={styles.cameraCapture}>

                    </TouchableOpacity>
                    </View>
                </Camera>}
                <TouchableOpacity
                        onPress={() => {
                        setType(type === CameraType.back ? CameraType.front : CameraType.back);
                        }}>
                        <Text style={styles.cameraFlip}> Flip </Text>
                    </TouchableOpacity>
                
                {
                    snap ? image && !image.cancelled && 
                    <View style={styles.identifyContainer}>
                        <Image source = {{uri: image.uri }} style={styles.uploadImage} />
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
                    </View> : 
                    selected && <View style={styles.identifyContainer}>
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
                </View>
                }
                <Button mode="text" onPress={pickImage} contentStyle={styles.identifyButton2} style={styles.identifyButton}>Select Image</Button>
            </View>
        </SafeAreaView>
    )
}
