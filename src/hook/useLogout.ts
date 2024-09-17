import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { Login } from '@/store/constant';

const useLogout = () => {
    const router = useRouter();
    const onLogout = useCallback(() => {
        router.push(`/`);
        Cookies.remove(Login.Access_Token);
    }, []);

    return { onLogout };
};

export default useLogout;
