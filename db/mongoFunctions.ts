import { SERVER_BASE_URL } from "../config/apiKeys"
import { UploadedPicture, SimilarClothesType } from "../config/types";
export async function grabUserImages(authToken: string){
    const res = await fetch(SERVER_BASE_URL+"/getImages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
        },
    });
    if (res.status >=400){
        console.error("Error fetching images");
        return [];
    }
    else {
        const resData = await res.json();
        const userImages : UploadedPicture[] = resData.images;
        return userImages;
    }
}

export async function getAssociatedProducts(imageName: string, authToken: string){
    const res = await fetch(SERVER_BASE_URL+"/getAssociated", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
        }
    });
    if (res.status == 400){
        console.log("No associated images");
        return false;
    }
    //return -1 if internal error
    else if(res.status >=400){
        alert("Error in getting associated image!");
        return -1;
    }
    else {
        const resData = await res.json();
        const similarClothes : SimilarClothesType[][] = resData.similarClothes;
        const similarCategories: string[] = resData.similarCategories;
        return({
            similarClothes: similarClothes,
            similarCategories: similarCategories
        })
    }
}