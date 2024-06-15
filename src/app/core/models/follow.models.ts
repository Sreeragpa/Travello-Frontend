export default interface IFollow{
    follower_id: string;
    following_id: string;
}

export interface IFollowCount{
    followingCount: number,
    followersCount: number,
}