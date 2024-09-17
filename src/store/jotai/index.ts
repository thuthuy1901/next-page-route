import { atom } from 'jotai';
import Cookies from 'js-cookie';
import { Login } from '../constant';

export const username = atom<string>(Cookies.get(Login.Username) || '');

export type allInfoPostType = {
    current_page: number;
    page_size: number;
    posts: postType[];
    total: number;
    total_page: number;
};

export type postType = {
    id: string;
    tags: (string | { tag: string })[];
    description: string;
    title: string;
};

export const allInfoPost = atom<allInfoPostType | null>(null);

export const listPost = atom<postType[] | null>((get) => {
    const allInfo = get(allInfoPost);
    return allInfo ? allInfo.posts : null;
});
