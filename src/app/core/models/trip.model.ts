import IUser from "./user.models";

export interface ITrip {
    _id?: string;
    creator_id?: string;
    title: string;
    startingPoint: {
      name: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    };
    destination: {
      name: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    };
    startDate: Date;
    endDate: Date;
    members?: string[];
    memberlimit: number     
    description: string;
    imageUrl?: string;
    issameuser?: boolean;
    isuserjoined?: boolean;
    creator?:IUser;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export interface ITripForm{
    title: string, members: number, description: string, start: Date, end: Date
  }
  