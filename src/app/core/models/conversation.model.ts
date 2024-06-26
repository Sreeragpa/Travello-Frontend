import IUser from "./user.models";

export default interface IConversation{
    _id: string,
    members:string[],
    createdAt: Date,
    updatedAt: Date,
    memberDetails: IUser[],
    isGroup: boolean;
    groupName?: string;
    currentUserId?: string
    lastMessage: string
}