import { View, Text, Image, ScrollView } from "react-native";
import { Button, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import lykdatResponse from "../../db/lykdatexample.json";
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from "../../navigation/ProfileStack";
import { SimilarClothesType } from "../../config/types";
import { PRIMARY_COLOR, styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as WebBrowser from 'expo-web-browser';
import { useContext, useEffect, useState } from "react";
import { getAssociatedProducts, updateAssociatedCategory, getAssociatedCategories } from "../../db/mongoFunctions";
import { AuthContext } from "../../navigation/AuthProvider";
type OutfitProps = StackScreenProps<ProfileStackParamList, 'Outfit'>;
export default function Outfit(props: OutfitProps) {
    const {userToken, user} = useContext(AuthContext);
    const { pic } = props.route.params;
    const { similarClothes, categoryNames } = pic;
    const isSameUser = user?.uid == pic.uid;
    const [displayedFilters, setDisplayedFilters] = useState<boolean[]>([]);
    const [localSimilarClothes, setSimilarClothes] = useState(similarClothes ?? []);
    const [viewClassified, setViewClassified] = useState(true);
    const [localCategoryNames, setLocalCategoryNames] = useState(categoryNames ?? []);
    const [renameCategoryIndex, setRenameCategoryIndex] = useState(-1);

    //load up the category names on mount to resync
    useEffect(() => {
        async function attemptGetCategories(){
            if(isSameUser){
            try{
            const categoryRes = await getAssociatedCategories(pic.image_name,userToken);
            if(categoryRes){
                setLocalCategoryNames(categoryRes);
            }
            }
            catch(err){
                console.error(err);
            }
        }
        }
        attemptGetCategories();
    }, [])

    const displayedCategories = localCategoryNames.map((category,ind) => 
        <Button  onPress={() => setDisplayedFilters(prev=> {
            const newFilters = [...prev];
            newFilters[ind] = !newFilters[ind];
            return newFilters;
        })}
        onLongPress={() => isSameUser ? setRenameCategoryIndex(ind) : null}
        key={category}
        contentStyle={{
            backgroundColor: displayedFilters[ind] ? PRIMARY_COLOR : "white",
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
        <Provider>
            <Portal>
                <Modal visible={ renameCategoryIndex !== -1} onDismiss={() => setRenameCategoryIndex(-1)} contentContainerStyle={styles.renameModal}>
                    <RenameCategory 
                        categoryName={localCategoryNames[renameCategoryIndex] ?? ""}  
                        ind={renameCategoryIndex}
                        setLocalCategoryNames={setLocalCategoryNames}
                        setRenameCategoryIndex={setRenameCategoryIndex}
                        imageName={pic.image_name}
                    />
                </Modal> 
            </Portal>
            <View>
                <View style={styles.flexRow}>
                    <Button  onPress={() => setViewClassified(prev=> !prev) }
                    contentStyle={{
                        backgroundColor: viewClassified ? PRIMARY_COLOR : "white",
                    }}
                    color={viewClassified ? "white" : PRIMARY_COLOR}
                    mode="outlined"
                    >
                        View Classified?
                    </Button>
                </View>
                <View style={styles.flexRow}>

                {displayedCategories}
                </View>
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
            </View>
        </Provider>
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
                <Image style={styles.similarImage} source= {{
                        uri: props.item.matching_image ?? ''
                    }
                }/>
            </TouchableOpacity>
        </View>
    )
}

interface RenameProps {
    imageName: string;
    categoryName: string;
    setLocalCategoryNames: React.Dispatch<React.SetStateAction<string[]>>;
    ind: number;
    setRenameCategoryIndex: (val: number) => void;
}

function RenameCategory(props: RenameProps){
    const [currentText, setCurrentText] = useState("");
    const {userToken} = useContext(AuthContext)
    async function adjustCategory(ind : number){
        const res = await updateAssociatedCategory(props.imageName, props.ind, currentText, userToken );
        if(res){
            props.setLocalCategoryNames((prevNames) => {
                const newNames = [...prevNames];
                newNames[ind] = currentText;
                return newNames;
            });
        }
        props.setRenameCategoryIndex(-1);
    }
    return(
        <View>
            <Text>
                Rename {props.categoryName}?
            </Text>
            <TextInput
                    label="New Category Title"
                    value={currentText}
                    onChangeText={text => setCurrentText(text)}
                    mode="flat"
                    autoComplete={false}
                    style={styles.renameInput}
                />
                <Button onPress={() => adjustCategory(props.ind)}>Confirm</Button>
        </View>
    )
}