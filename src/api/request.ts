import TokenManager, { injectBearer } from 'brainless-token-manager';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_PATH, BASE_API } from './constant';
import { Login } from '@/store/constant';

const tokenManager = new TokenManager({
    getAccessToken: async () => {
        const token = Cookies.get(Login.Access_Token);
        return `${token}`;
    },
    getRefreshToken: async () => {
        const refreshToken = Cookies.get(Login.Refresh_Token);

        return `${refreshToken}`;
    },
    onInvalidRefreshToken: () => {
        Cookies.remove(Login.Access_Token);
        Cookies.remove(Login.Refresh_Token);
    },

    executeRefreshToken: async () => {
        const refreshToken = Cookies.get(Login.Access_Token);

        if (!refreshToken) {
            return {
                token: '',
                refresh_token: '',
            };
        }

        const response = await axiosInstant.post(API_PATH.REFRESH_TOKEN, {
            refreshToken,
        });
        const { accessToken: accessTokenNew, refreshToken: refreshTokenNew } =
            response.data;

        return {
            token: accessTokenNew,
            refresh_token: refreshTokenNew,
        };
    },
    onRefreshTokenSuccess: ({ token, refresh_token }) => {
        if (token && refresh_token) {
            Cookies.set(Login.Access_Token, token);
            Cookies.set(Login.Refresh_Token, refresh_token);
        }
    },
});

export const axiosInstant = axios.create({
    baseURL: BASE_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const tokenManagerInstance = async (
    request: any,
    suffixUrl: string,
    configs?: any
) => {
    const token: string = configs?.token
        ? configs?.token
        : ((await tokenManager.getToken()) as string);

    return request(suffixUrl, injectBearer(token, configs));
};
