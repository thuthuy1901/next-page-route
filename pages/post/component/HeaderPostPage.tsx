import iconUser from '../../../public/userIcon.png';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { username } from '@/store/jotai';
import useLogout from '@/hook/useLogout';
import { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';

export default function HeaderPostPage() {
    const t = useTranslations('postPage');
    const { onLogout } = useLogout();
    const [name] = useAtom(username);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <header className="h-20 bg-white flex justify-end items-center gap-x-5 px-20">
            <div className="flex items-center gap-x-2">
                <Image src={iconUser} alt="iconUser" />
                <p className="mb-0">{name}</p>
            </div>
            <button onClick={() => onLogout()}>{t('button')}</button>
        </header>
    );
}
