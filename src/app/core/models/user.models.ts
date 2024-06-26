import { ITrip } from "./trip.model";

export interface IUserBasic{
    username: string,
    id: string,
    profileimg: string
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
    
  }
  export interface ILikedUser{
    _id:string,
    username: string,
    isMutualFollow: boolean,
    profileimg: string
    
}