export interface IUserBasic{
    username: string,
    id: string
}


export default interface IUser {
    id: string
    username: string;
    name: string
    email: string;
    hostedTrips?: string[]; 
    posts?: string[]; 
    chats?: string[];
    // followers?: string[]; 
    // following?: string[]; 
    notifications?: string[]; 
    password?: string;
    profileimg?: string;
    bio: string
  }
