import { ILikedUser, IUserBasic } from "./user.models";

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
    createdAt: Date,
    isFollowing?: boolean,
    same_user?:boolean,
    isSaved?: boolean,
    likedUsers?: ILikedUser[],
    comments?:any,
}

export interface IPostLike{
    post_id: string,
    user_id: string
}

export interface ISaves{
    user_id: string,
    post_id: string
    
}