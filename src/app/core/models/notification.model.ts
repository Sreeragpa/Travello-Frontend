import { ITrip } from "./trip.model";
import IUser from "./user.models";

export interface INotification  {
    _id: string
    sender: string;
    recipient: string;
    type: "JOINREQUEST" | "REQUEST"; // Enum for possible notification types
    tripid: string;
    createdAt?: Date;
    updatedAt?: Date;
    senderDetails?: IUser;
    tripDetails?: ITrip
    
}
