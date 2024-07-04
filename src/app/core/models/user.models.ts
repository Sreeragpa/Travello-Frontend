import { ITrip } from "./trip.model";

export interface IUserBasic{
    username: string,
    _id: string,
    profileimg: string,
    isPremium: boolean
}


export default interface IUser {
    _id: string
    username: string;
    name: string
    email: string;
    hostedTrips?: string[]; 
    posts?: string[]; 
    chats?: string[];
    notifications?: string[]; 
    password?: string;
    profileimg?: string;
    bio: string;
    isFollowing: boolean
    isBlocked: boolean
    isPremium: boolean
    
  }
  export interface ILikedUser{
    _id:string,
    username: string,
    isMutualFollow: boolean,
    profileimg: string
    
}