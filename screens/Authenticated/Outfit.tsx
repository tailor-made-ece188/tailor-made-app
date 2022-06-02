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
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

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
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState(null);
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
        <Button  style={styles.buttonRowButton} onPress={() => setDisplayedFilters(prev=> {
            const newFilters = [...prev];
            newFilters[ind] = !newFilters[ind];
            return newFilters;
        })}
        onLongPress={() => isSameUser ? setRenameCategoryIndex(ind) : null}
        key={category}
        contentStyle={{
            backgroundColor: displayedFilters[ind] ? PRIMARY_COLOR : "white",
            height:40,
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
    const srcImage = {
        filename: {},
        directory: '', 
        mode: 'AspectFill'
      }
    function drawImage(){
        setModal(true);
        
    }
 
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
            <Portal >
                <Modal visible={ renameCategoryIndex !== -1} onDismiss={() => setRenameCategoryIndex(-1)} contentContainerStyle={styles.renameModal}>
                    <RenameCategory 
                        categoryName={localCategoryNames[renameCategoryIndex] ?? ""}  
                        ind={renameCategoryIndex}
                        setLocalCategoryNames={setLocalCategoryNames}
                        setRenameCategoryIndex={setRenameCategoryIndex}
                        imageName={pic.image_name}
                    />
                </Modal>
                <Modal visible={modal} onDismiss={()=>setModal(false)} contentContainerStyle={styles.drawModal}>
                    <View style={styles.drawContainer}>
                        {/* <SketchCanvas
                            style={{ flex: 1 }}
                            strokeColor={'red'}
                            strokeWidth={7}
                        /> */}
                        <Image style={styles.classifiedImage2} source={{
                                        uri: props.route.params.pic.uploaded_image
                                    }
                                    } />
                        <Button>Upload</Button>
                    </View>

                </Modal> 
            </Portal>
            
            <View style={styles.outfitContainer}>
                {/* <View style={styles.flexRow}>

                </View> */}
                <ScrollView contentContainerStyle={styles.categoryRow} horizontal={true} alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
                    <Button  onPress={() => setViewClassified(prev=> !prev) }
                        style={styles.buttonRowButton}
                        contentStyle={{
                            backgroundColor: viewClassified ? PRIMARY_COLOR : "white",
                            zIndex: 3,
                            height:40,
                        }}
                        color={viewClassified ? "white" : PRIMARY_COLOR}
                        mode="outlined"
                        >
                            View Classified
                    </Button>
                    {displayedCategories}
                </ScrollView>
                {/* <View style={styles.buffer}></View> */}
                {
                    viewClassified && 
                    <TouchableOpacity onPress={() => drawImage()}>
                    <View style={styles.classifiedImageRow}>
                        {
                            <Image style={styles.classifiedImage2} source={{
                                uri: props.route.params.pic.segmented_image
                            }
                            } />
                        }
                    </View>
                    </TouchableOpacity>
                }
                
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
        <View style={styles.outfitModal1}>
            <Text style={styles.modalText1}>
                Rename {props.categoryName}
            </Text>
            <TextInput
                    selectionColor={PRIMARY_COLOR}
                    activeUnderlineColor={PRIMARY_COLOR}
                    label="New Category Title"
                    value={currentText}
                    onChangeText={text => setCurrentText(text)}
                    mode="flat"
                    autoComplete={false}
                    style={styles.renameInput}
                />
                <Button color={PRIMARY_COLOR} onPress={() => adjustCategory(props.ind)}>Confirm</Button>
        </View>
    )
}