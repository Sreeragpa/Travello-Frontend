import IUser from "./user.models"

export interface IComment{
    _id: string
    post_id: string,
    content: string,
    author_id: string,
    createdAt: Date,
    updatedAt: Date,
    user:IUser[]
}