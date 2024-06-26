import IUser from "./user.models";

export interface IMessage{
    _id?: string
    conversation_id: string,
    sender: string,
    text: string,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessagewithConversationInfo{
    messages:IMessage[];
    userInfo: IUser[]
}