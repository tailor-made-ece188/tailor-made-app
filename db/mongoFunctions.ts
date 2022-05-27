import { SERVER_BASE_URL } from "../config/apiKeys"
import { UploadedPicture } from "../config/types";
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