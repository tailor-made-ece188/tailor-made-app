export interface RegisterUserObject {
    username: string;
    password: string;
    email: string;
}

export interface UserProfile {
    username: string;
    email: string;
    uid: string;
}

export interface UploadedPicture {
    _id: string;
    uid: string;
    image_name: string;
    uploaded_image: string;
    segmented_image?: string;
}