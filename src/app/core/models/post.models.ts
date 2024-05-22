import { IUserBasic } from "./user.models";

export interface IPost{
    _id?: string,
    creator_id?: string
    caption: string,
    images: string[],
    location:{
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
    };
    place: string,
    user?:IUserBasic,
    isLiked?: boolean,
    likes: number,
    createdAt: Date
}