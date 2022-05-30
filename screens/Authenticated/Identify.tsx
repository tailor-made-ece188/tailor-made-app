import React, { useContext, useState, useEffect } from 'react';
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

export default function Identify(props: IdentifyProps) {
    const {user, userToken, setUserPics} = useContext(AuthContext);
    const [image,setImage ] = useState<null | ImagePicker.ImageInfo>(null);
    const [imageName, setImageName] = useState("");
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
            console.log(images);
            setUserPics(images);
          })
        if(res){
            setImage(null);
            
        }
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
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cameraContainer}>
                {/* <Text> Our Identify Page!</Text> */}
                <Camera  type={type} style={styles.camera}>
                <View >
                <TouchableOpacity
                    onPress={() => {
                    setType(type === CameraType.back ? CameraType.front : CameraType.back);
                    }}>
                    <Text style={styles.cameraFlip}> Flip </Text>
                </TouchableOpacity>
                </View>
            </Camera>
                <Button mode="text" onPress={pickImage}>Select Image</Button>
                {
                    image && !image.cancelled && 
                    <View>
                        <Image source = {{uri: image.uri }} style={{height: 200, width: 250}} />
                        <TextInput 
                            mode="outlined" 
                            label="Image Name" 
                            value={imageName} 
                            onChangeText={imageName => setImageName(imageName)} 
                            autoComplete={false}
                            style={styles.input}
                            autoCapitalize={"none"}
                        />
                        <Button mode="contained" onPress={() => attemptUpload(imageName)}>Upload</Button>
                    </View>

                }
            </View>
        </SafeAreaView>
    )
}
