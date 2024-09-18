import { useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import useToast from './useToast';
import { username } from '@/store/jotai';
import { useTranslation } from 'next-i18next';
import { API_PATH } from '@/api/constant';
import { Login } from '@/store/constant';

const useLogin = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [_, setUser] = useAtom(username);
    const { notifySuccess, notifyError } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onLogin = useCallback(async (username: string) => {
        setIsLoading(true);
        try {
            const response = await axios.post(API_PATH.AUTH_LOGIN, {
                username,
            });

            if (response.data.accessToken) {
                const { accessToken, refreshToken } = response.data;

                router.push(`/post`);
                Cookies.set(Login.Access_Token, accessToken);
                Cookies.set(Login.Refresh_Token, refreshToken);
                Cookies.set(Login.Username, username);

                notifySuccess(t('toast.succ'));
                setUser(username);
            } else {
                throw new Error('Login fail');
            }
        } catch {
            notifyError(t('toast.err'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { onLogin, isLoading };
};

export default useLogin;
