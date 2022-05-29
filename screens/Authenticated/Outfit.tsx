import { View, Text, Image, ScrollView } from "react-native";
import lykdatResponse from "../../db/lykdatexample.json";
import { SimilarClothesType } from "../../config/types";
import { styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from "react";

export default function Outfit() {
    const [displayedFilters, setDisplayedFilters] = useState<boolean[]>([]);
    const displayedItems = lykdatResponse.data.result_groups.map((group, ind) => {
        const itemType = group.detected_item.name;
        const itemCategory = group.detected_item.category;
        const itemList = group.similar_products;
        return <ClothingTypeDisplay itemType={itemType} itemCategory={itemCategory} itemList={itemList} key={ind} />
    });
    //useEffect once lykdat data is loaded
    useEffect(() => {
        const filterArr : boolean[]=  Array(lykdatResponse.data.result_groups.length).fill(true);
        setDisplayedFilters(filterArr);
    }, [lykdatResponse])
    return (
        <View>
            <ScrollView>
                {displayedItems}
            </ScrollView>
        </View>
    )
}

interface ClothingTypeDisplayProps {
    itemType: string;
    itemCategory: string | null;
    itemList: SimilarClothesType[]
}

function ClothingTypeDisplay(props: ClothingTypeDisplayProps) {
    const filteredItems = props.itemList.filter(item => {
        const imageStr = item.matching_image;
        if (!imageStr) return false;
        const imageRegEx = '^.*.(jpe?g|png|JPE?G)$';
        const validImage = imageStr.search(imageRegEx);
        //return true if it is a valid url
        return validImage == 0;
    });

    const displayedArticles= filteredItems.map(item=> 
    <ArticleDisplay item={item} key={item.id}
    // name={item.name ?? "" } image={item.matching_image ?? ""} key={item.id} url={item.url ?? ''}
    />)


    return (
        <View>
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