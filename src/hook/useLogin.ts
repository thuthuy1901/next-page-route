import { useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { BASE_API } from '../service/resquest';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import useToast from './useToast';
import { username } from '@/store';
import { BASE_API } from '@/service/request';
import { useTranslations } from 'use-intl';

const useLogin = () => {
    const t = useTranslations('toast');
    const router = useRouter();
    const [_, setUser] = useAtom(username);
    const { notifySuccess, notifyError } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onLogin = useCallback(async (username: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_API}/auth/login`, {
                username,
            });

            if (response.data.accessToken) {
                const { accessToken, refreshToken } = response.data;

                router.push(`/post`);
                Cookies.set('accessToken', accessToken);
                Cookies.set('refreshToken', refreshToken);
                Cookies.set('username', username);

                notifySuccess(t('succ'));
                setUser(username);
            } else {
                throw new Error('Login fail');
            }
        } catch {
            notifyError(t('err'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { onLogin, isLoading };
};

export default useLogin;
