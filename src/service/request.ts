import TokenManager, { injectBearer } from 'brainless-token-manager';
import axios from 'axios';
import Cookies from 'js-cookie';

export const BASE_API = 'https://api-test-web.agiletech.vn';

const tokenManager = new TokenManager({
    getAccessToken: async () => {
        const token = Cookies.get('accessToken');
        return `${token}`;
    },
    getRefreshToken: async () => {
        const refreshToken = Cookies.get('refreshToken');

        return `${refreshToken}`;
    },
    onInvalidRefreshToken: () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
    },

    executeRefreshToken: async () => {
        const refreshToken = Cookies.get('accessToken');

        if (!refreshToken) {
            return {
                token: '',
                refresh_token: '',
            };
        }

        const response = await axiosInstant.post('/auth/refresh-token', {
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
            Cookies.set('accessToken', token);
            Cookies.set('refreshToken', refresh_token);
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
