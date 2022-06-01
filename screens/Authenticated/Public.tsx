import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { HomeStackParamsList } from "../../navigation/HomeStack";
import { styles } from "../../styles";
import { UploadedPicture} from "../../config/types";
import type { MaterialBottomTabScreenProps } from "@react-navigation/material-bottom-tabs";
import { grabPublicImages } from "../../db/mongoFunctions";
import { AuthContext } from "../../navigation/AuthProvider";
import { PicItem } from "./Profile";
import { PublicStackParamList } from "../../navigation/PublicStack";
import { ScrollView } from "react-native-gesture-handler";
type PublicProps = MaterialBottomTabScreenProps<PublicStackParamList, 'Public'>;

export default function Public(props: PublicProps) {
    const [publicOutfits, setPublicOutfits] = useState<UploadedPicture[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { userToken } = useContext(AuthContext);
    useEffect(() => {
        grabPublicImages(userToken).then(images=> setPublicOutfits(images))
    }, [])

    function moveToOutfitPage(pic: UploadedPicture){
        props.navigation.navigate('Outfit', {
            pic: pic
        })
    }

    const displayedOutfits = publicOutfits.map(outfit=> (<PicItem pic={outfit} key={outfit._id} moveToOutfitPage={moveToOutfitPage} setIsLoading={setIsLoading}/>))
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.homeSquare1}></View>
            <View style={styles.homeSquare2}></View>
            <ScrollView>
                {displayedOutfits}
            </ScrollView>
        </SafeAreaView>
    )
}
