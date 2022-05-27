
//import firebase from "firebase";
import {FIREBASE_CONFIG, SERVER_BASE_URL} from "../config/apiKeys";
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { UserProfile } from "../config/types";
// Initialize Firebase
import {Platform} from "react-native";
//const app = initializeApp(apiKeys.firebaseConfig);
import {} from "expo-image-picker"

let app: FirebaseApp | null = null;
if (!firebase.apps.length) app = firebase.initializeApp(FIREBASE_CONFIG);
else app = firebase.app();
console.log("Firebase set up!");

export async function uploadImage(user : UserProfile, token: string, imageName : string, image: ImagePicker.ImageInfo){
    if(!app){
        return null;
    }
    const storage = getStorage(app);
    const uri = image.uri;
    const res = await fetch(uri);
    const blob = await res.blob();
    //upload file
    try{
        const imageRef = ref(storage, `images/${user.username}/${imageName}`);
        const uploadTask = await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        console.log("Image available at " + downloadURL);
        const res = await fetch(SERVER_BASE_URL + "/addImage", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": token,
                        },
                        body: JSON.stringify({
                            image_url: downloadURL,
                            image_name: imageName,
                          }),
                    });
        if (res.status>=400){
            console.error("Error uploading image");
            return false;
        }
        else {
            alert("Successfully uploaded image!");
            return true;
        }
        
        

    //     const uploadTask = uploadBytesResumable(imageRef, blob);
    //         // Listen for state changes, errors, and completion of the upload.
    // uploadTask.on('state_changed',
    // (snapshot) => {
    // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + Math.round(progress) + '% done');
    // switch (snapshot.state) {
    //     case 'paused':
    //     console.log('Upload is paused');
    //     break;
    //     case 'running':
    //     console.log('Upload is running');
    //     break;
    // }
    // }, 
    // (error) => {
    // // A full list of error codes is available at
    // // https://firebase.google.com/docs/storage/web/handle-errors
    // switch (error.code) {
    //     case 'storage/unauthorized':
    //     // User doesn't have permission to access the object
    //     console.error("// User doesn't have permission to access the object");
    //     break;
    //     case 'storage/canceled':
    //     // User canceled the upload
    //     console.error("// User canceled the upload");
    //     break;

    //     // ...

    //     case 'storage/unknown':
    //     // Unknown error occurred, inspect error.serverResponse
    //     console.error("// Unknown error occurred, inspect error.serverResponse");
    //     break;
    // }
    // }, 
//     () => {
//     // Upload completed successfully, now we can get the download URL
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log('File available at', downloadURL);
//         fetch(SERVER_BASE_URL + "/addImage", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": token,
//             },
//             body: JSON.stringify({
//                 image_url: downloadURL,
//                 image_name: imageName,
//               }),
//         }).then(res=> {
//             if(res.status>400){
//                 console.error("Error uploading image");
//                 return false;
//             }
//             else {
//                 alert("Successfully uploaded image!");
//                 return true;
//             }
//         })
//     });
//     }
// );
    }
    catch(err){
        console.error(err);
        return false;
    }
}

export async function deleteUploadedImage(user: UserProfile, token: string, imageName: string){
    if(!app){
        return null;
    }
    const storage = getStorage(app);
    const deleteRef = ref(storage, `images/${user.username}/${imageName}`);
    //classified is same ref but with _classified appended
    const classifiedRef = ref(storage, `images/${user.username}/${imageName}_classified`);
    try{
    const deleteRes = await deleteObject(deleteRef);
    try{
        const classifiedRes = await deleteObject(classifiedRef);
    }
    catch(err){
        console.log("No classified image");
    }
    await fetch(SERVER_BASE_URL + "/deleteImage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        body: JSON.stringify({
            image_name: imageName
        })
    })
    alert("Successfully deleted image");
    }
    catch(err){
        console.error(err);
    }

}


