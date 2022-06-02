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
    similarClothes?: SimilarClothesType[][],
    categoryNames?: string[];
    public?: boolean;
    confidences?: Confidence[]
}

interface Confidence {
    score: number;
    label: string
}

export interface SimilarClothesType {
    brand_name?: string | undefined | null;
    category?: string | undefined | null;
    currency?: string | undefined | null;
    gender?: string | undefined | null;
    id?: string | undefined | null;
    images?: string[]
    matching_image?: string | undefined | null;
    name?: string | undefined | null;
    price?: string | undefined | null;
    reduced_price?: string | undefined | null;
    score?: number
    sub_category?: string | undefined | null;
    url?: string | undefined | null;
    vendor?: string | undefined | null;
}                    