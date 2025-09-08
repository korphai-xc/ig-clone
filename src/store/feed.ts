import { atom } from 'jotai';

interface User {
  username: string;
  avatar: string;
}

interface Comment {
  user: string;
  text: string;
}

export interface Post {
  ID: number;
  image: string;
  user: User;
  caption: string;
  likes: number;
  comments: Comment[];
}

export const postsAtom = atom<Post[]>([]);
export const isLoadingAtom = atom(false);
export const isSearchModeAtom = atom<boolean>(false);
export const selectedBreedAtom = atom<string>('');
