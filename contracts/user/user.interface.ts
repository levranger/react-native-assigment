export interface User {
    _id: string;
    invited_memberships: number;
    invites: number;
    membership: Membership;
    picture: string;
    points: number;
    preorder: Preorder;
    referral_count: number;
    ticker: string;
    twitter_data: TwitterData;
    twitter_userID: string;
    type: string;
    username: string;
}


export interface Membership {
    count: number;
    currency: string;
    expires_at: string;
    membership_id: number;
    payment_method: string;
    premium_since: string;
    price: number;
    referred_by: string;
    tier: string;
}

export interface Preorder {
    claimed: boolean;
    claimed_android: boolean;
    claimed_at: string;
    claimed_at_android: string;
    invited_by: string;
    invited_by_android: string;
    users_invited: number;
}

export interface TwitterData {
    created_at: string;
    followers_count: number;
    following_count: number;
    url: string;
    verified: boolean;
}