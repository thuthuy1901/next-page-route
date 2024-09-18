import HeaderPostPage from './component/HeaderPostPage';
import BodyPostPage from './component/BodyPostPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

export default function PostPage() {
    return (
        <section className="min-w-screen min-h-screen h-fit bg-background">
            <HeaderPostPage />
            <BodyPostPage />
        </section>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(
                locale,
                ['common'],
                nextI18NextConfig
            )),
        },
    };
}
