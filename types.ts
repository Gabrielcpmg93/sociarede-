export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  fullName: string;
  bio?: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: Date;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: Date;
  likedByMe: boolean;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  hasUnseen: boolean;
}

export enum ViewState {
  FEED = 'FEED',
  EXPLORE = 'EXPLORE',
  CREATE = 'CREATE',
  PROFILE = 'PROFILE',
  NOTIFICATIONS = 'NOTIFICATIONS'
}