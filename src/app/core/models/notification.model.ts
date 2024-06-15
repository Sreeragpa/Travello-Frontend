import { NOTIFICATION_TYPE } from "../enums/notification.enums";
import { ITrip } from "./trip.model";
import IUser from "./user.models";

export interface INotification  {
    _id: string
    sender: string;
    recipient: string;
    type: NOTIFICATION_TYPE // Enum for possible notification types
    tripid: string;
    createdAt?: Date;
    updatedAt?: Date;
    senderDetails?: IUser;
    tripDetails?: ITrip
    
}
