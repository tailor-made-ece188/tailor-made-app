import { SERVER_BASE_URL, MODEL_SERVER_BASE_URL } from "../config/apiKeys"
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

export async function grabPublicImages(authToken: string){
    const res = await fetch(SERVER_BASE_URL + "/getPublicImages", {
        method: "GET",
        headers: {
            "auth-token":authToken
        }
    });
    if (res.status >=400){
        console.error("Error fetching images");
        return [];
    }
    else {
        const resData = await res.json();
        const publicImages : UploadedPicture[] = resData.images;
        return publicImages;
    }
}

export async function updatePublicValue(imageName: string, newVal: boolean, authToken: string){
    const res = await fetch(SERVER_BASE_URL + "/updatePublic", {
        method: "POST",
        headers: {
            "auth-token": authToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            image_name: imageName,
            val: newVal
        })
    });
    if (res.status >=400){
        console.error("Error updating value");
        return false;
    }
    else {
        return true;
    }
}

export async function classifyImage(imageName: string, authToken: string){
    const res = await fetch(MODEL_SERVER_BASE_URL+"/classifyImage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
        },
        body: JSON.stringify({
            image_name: imageName
        })
    });
    if (res.status >= 400){
        alert("Error classifying outfit!");
        return false;
    }
    else return true;
}

export async function findAssociatedProducts(imageName: string, authToken: string){
    const res = await fetch(SERVER_BASE_URL+"/findAssociated", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
        },
        body: JSON.stringify({
            image_name: imageName
        })
    });
    if(res.status >= 400){
        alert("Error getting associated products!");
        return false;
    }
    else {
        return true;
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

export async function updateAssociatedCategory(imageName: string, index: number, newName: string, authToken: string){
    const res = await fetch(SERVER_BASE_URL + "/updateAssociatedCategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
        },
        body: JSON.stringify({
            image_name: imageName,
            index: index,
            new_name: newName
        })
    });
    if(res.status >= 400){
        console.error("Error updating associated category");
        return false;
    }
    else {
        return true;
    }
}

export async function getAssociatedCategories(imageName: string, authToken: string){
    const res = await fetch(SERVER_BASE_URL + "/getAssociatedCategories?" + new URLSearchParams({
        image_name: imageName
    }), {
        method: "GET",
        headers: {
            "auth-token": authToken,
        },
    });
    if (res.status >=400){
        console.error("Error getting associated categories");
        return false;
    }
    else {
        const resData = await res.json();
        const categories : string[] = resData.categories;
        return categories;
    }
}
