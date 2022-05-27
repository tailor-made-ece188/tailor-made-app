import React, {useContext} from "react";
import { SafeAreaView, View, Text, Alert, Image } from "react-native";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import { styles } from "../../styles";
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { AuthContext } from "../../navigation/AuthProvider";
import { Button } from "react-native-paper"
import { UploadedPicture } from "../../config/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ProfileProps = MaterialBottomTabScreenProps<HomeStackParamsList, 'Profile'>;
export default function Profile(props: ProfileProps) {
    const {logout, userPics} = useContext(AuthContext);
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

    const PicIcons = userPics.map(pic=> (<PicItem pic={pic} key={pic.image_name}/>));
    return (
        <SafeAreaView>
            <View>
                <Text> Our Profile Page!</Text>
                <Text>Your Uploaded Pics</Text>
                {PicIcons}
                <Button onPress={() => attemptLogout()} mode="contained" >Log Out</Button>
            </View>
        </SafeAreaView>
    )
}

interface PicItemProps {
    pic: UploadedPicture
}
function PicItem(props: PicItemProps){
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
        <View>
            <Text>{props.pic.image_name}</Text>
            <View style= {{
                display: "flex",
                flexDirection: "row"
            }}>
                <TouchableOpacity onPress={() => {
                   attemptClassify(props.pic)
                }}>
                <Image style={styles.fitImage} source={{
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
        </View>
    )
}