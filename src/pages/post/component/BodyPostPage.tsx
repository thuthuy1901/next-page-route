import { useAtom } from 'jotai';
import { useEffect } from 'react';
import ListPost from './ListPost';
import { allInfoPost } from '@/store';
import { axiosInstant, tokenManagerInstance } from '@/service/request';
import { useTranslations } from 'use-intl';
// import { useTranslation } from '@/app/i18n';

const BodyPostPage = () => {
    const t = useTranslations('postPage');
    const [_, setAllInfoPost] = useAtom(allInfoPost);
    const fetchPosts = async () => {
        try {
            const respond = await tokenManagerInstance(
                axiosInstant.get,
                '/posts'
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
