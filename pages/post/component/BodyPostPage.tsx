import { useAtom } from 'jotai';
import { useEffect } from 'react';
import ListPost from './ListPost';
import { axiosInstant, tokenManagerInstance } from '@/api/request';
import { useTranslations } from 'use-intl';
import { API_PATH } from '@/api/constant';
import { allInfoPost } from '@/store/jotai';

const BodyPostPage = () => {
    const t = useTranslations('postPage');
    const [_, setAllInfoPost] = useAtom(allInfoPost);
    const fetchPosts = async () => {
        try {
            const respond = await tokenManagerInstance(
                axiosInstant.get,
                API_PATH.GET_POSTS
            );
            setAllInfoPost(respond.data);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="px-[85px] py-2">
            <h1 className="text-[32px] leading-10 mb-2">{t('title')}</h1>
            <ListPost />
        </div>
    );
};

export default BodyPostPage;
