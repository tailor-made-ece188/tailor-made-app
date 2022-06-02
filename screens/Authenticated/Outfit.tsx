import { View, Text, Image, ScrollView } from "react-native";
import { Button } from 'react-native-paper';
import lykdatResponse from "../../db/lykdatexample.json";
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from "../../navigation/ProfileStack";
import { SimilarClothesType } from "../../config/types";
import { PRIMARY_COLOR, styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as WebBrowser from 'expo-web-browser';
import { useContext, useEffect, useState } from "react";
import { getAssociatedProducts } from "../../db/mongoFunctions";
import { AuthContext } from "../../navigation/AuthProvider";

type OutfitProps = StackScreenProps<ProfileStackParamList, 'Outfit'>;
export default function Outfit(props: OutfitProps) {
    const {userToken} = useContext(AuthContext);
    const { pic } = props.route.params;
    const { similarClothes, categoryNames } = pic;
    const [displayedFilters, setDisplayedFilters] = useState<boolean[]>([]);
    const [localSimilarClothes, setSimilarClothes] = useState(similarClothes ?? []);
    const [viewClassified, setViewClassified] = useState(true);
    const [localCategoryNames, setLocalCategoryNames] = useState(categoryNames ?? [])
    const displayedCategories = localCategoryNames.map((category,ind) => 
        <Button  style={styles.buttonRowButton} onPress={() => setDisplayedFilters(prev=> {
            const newFilters = [...prev];
            newFilters[ind] = !newFilters[ind];
            return newFilters;
        }) } key={category}
        contentStyle={{
            backgroundColor: displayedFilters[ind] ? PRIMARY_COLOR : "white",
            height:50,
        }}
        color={displayedFilters[ind] ? "white" : PRIMARY_COLOR}
        mode="outlined"
        >
        
        {category}
      </Button>
    );

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
        return displayedFilters[ind] ? <ClothingTypeDisplay itemList={group} itemCategory={localCategoryNames[ind] ?? "Category " + (ind+1)} key={ind} />
        : []
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
        <View style={styles.container}>
            
            <View style={styles.flexRow}>
            {
                    viewClassified && <Image style={styles.classifiedImage} source={{
                        uri: props.route.params.pic.segmented_image
                    }
                    
                    } />
                }
            </View>
            
            <ScrollView>
                {displayedItems}
            </ScrollView>
            <ScrollView horizontal={true} style={styles.buttonRow}>
                <Button  style={styles.buttonRowButton} onPress={() => setViewClassified(prev=> !prev) }
                contentStyle={{
                    backgroundColor: viewClassified ? PRIMARY_COLOR : "white",
                    height:50,
                }}
                color={viewClassified ? "white" : PRIMARY_COLOR}
                mode="outlined"
                >
                    View Classified
                </Button>
            

            {displayedCategories}
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
            <Text style={styles.outfitType}>{props.itemCategory}</Text>
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
        <View style={styles.outfitDisplay}>
            <Text style={styles.outfitName}>
                {props.item.name}
            </Text>
            <View style={styles.outfitText}>
                <Text>
                    {`Vendor: ${props.item.vendor ?? 'NOT LISTED'}`}
                </Text>
                <Text>
                    {`Price: $${props.item.price}`}
                </Text>
            </View>

            <TouchableOpacity onPress={async() => openProductPage(props.item.url ?? '')}>
                <Image style={styles.similarImage} source= {{
                        uri: props.item.matching_image ?? ''
                    }
                }/>
            </TouchableOpacity>
        </View>
    )
}