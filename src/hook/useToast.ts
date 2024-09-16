import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useToast = () => {
    const notifySuccess = useCallback((message: string) => {
        toast.success(message);
    }, []);

    const notifyError = useCallback((message: string) => {
        toast.error(message);
    }, []);

    return { notifySuccess, notifyError };
};

export default useToast;
