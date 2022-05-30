import { View, Text, Image, ScrollView } from "react-native";
import lykdatResponse from "../../db/lykdatexample.json";
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from "../../navigation/ProfileStack";
import { SimilarClothesType } from "../../config/types";
import { styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as WebBrowser from 'expo-web-browser';
import { useContext, useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../config/apiKeys";
import { getAssociatedProducts } from "../../db/mongoFunctions";
import { AuthContext } from "../../navigation/AuthProvider";


type OutfitProps = StackScreenProps<ProfileStackParamList, 'Outfit'>;
export default function Outfit(props: OutfitProps) {
    const {userToken} = useContext(AuthContext)
    const { pic } = props.route.params;
    const { similarClothes, categoryNames } = pic;
    const [displayedFilters, setDisplayedFilters] = useState<boolean[]>([]);
    const [localSimilarClothes, setSimilarClothes] = useState(similarClothes ?? []);
    const [localCategoryNames, setLocalCategoryNames] = useState(categoryNames ?? [])


    // const [similarClothes, setSimilarClothes] = useState<SimilarClothesType[][]>([]);
    // const [similarCategories, setSimilarCategories] = useState<string[]>([]);
    //grab the data when imageName or imageURL Change
    // useEffect(() => {
    //     getAssociatedProducts(imageName, userToken ).then(res=> {
            
    //         if (res == -1){
    //             alert("Invalid Image in Database!")
    //             setSimilarCategories([]);
    //             setSimilarClothes([]);
    //             return;
    //         }
    //         else if (!res){
    //             alert("Image not checked yet.");
    //             setSimilarCategories([]);
    //             setSimilarClothes([]);
    //             return;
    //         }
    //         else {
    //             console.log("Setting similar categories")
    //             setSimilarCategories(res.similarCategories);
    //             setSimilarClothes(res.similarClothes);
    //         }
    //     })
    // }, [imageName, imageURL])

    const displayedItems = localSimilarClothes.map((group, ind) => {
        return <ClothingTypeDisplay itemList={group} itemCategory={localCategoryNames[ind] ?? "Category " + (ind+1)} key={ind} />
    });


 
    //useEffect once categories list is loaded
    useEffect(() => {
        if(!categoryNames){
            setDisplayedFilters([]);
            return;
        }
        const filterArr : boolean[]=  Array(categoryNames.length).fill(true);
        setDisplayedFilters(filterArr);
    }, [categoryNames])
    return (
        <View>
            <ScrollView>
                {displayedItems}
            </ScrollView>
        </View>
    )
}

interface ClothingTypeDisplayProps {
    itemCategory: string | null;
    itemList: SimilarClothesType[]
}

function ClothingTypeDisplay(props: ClothingTypeDisplayProps) {


    const displayedArticles= props.itemList.map(item=> 
    <ArticleDisplay item={item} key={item.id}
    // name={item.name ?? "" } image={item.matching_image ?? ""} key={item.id} url={item.url ?? ''}
    />)


    return (
        <View>
            <Text>{props.itemCategory}</Text>
            {displayedArticles}
        </View>
    )
}

interface ArticleDisplayProps {
    item: SimilarClothesType
}

function ArticleDisplay(props: ArticleDisplayProps) {
    async function openProductPage(url: string){
        await WebBrowser.openBrowserAsync(url);
    }
    return (
        <View>
            <Text>
                {props.item.name}
            </Text>
            <Text>
                {`Vendor: ${props.item.vendor ?? 'NOT LISTED'}`}
            </Text>
            <Text>
                {`PRICE: $${props.item.price}`}
            </Text>
            <TouchableOpacity onPress={async() => openProductPage(props.item.url ?? '')}>
                <Image style={styles.fitImage} source= {{
                        uri: props.item.matching_image ?? ''
                    }
                }/>
            </TouchableOpacity>
        </View>
    )
}