import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import Cookies from 'js-cookie';

const useLogout = () => {
    const router = useRouter();
    const onLogout = useCallback(() => {
        router.push(`/`);
        Cookies.remove('accessToken');
    }, []);

    return { onLogout };
};

export default useLogout;
