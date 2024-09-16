import HeaderPostPage from './component/HeaderPostPage';
import BodyPostPage from './component/BodyPostPage';

export default function PostPage() {
    return (
        <section className="min-w-screen min-h-screen h-fit bg-background">
            <HeaderPostPage />
            <BodyPostPage />
        </section>
    );
}

export async function getStaticProps(context: any) {
    return {
        props: {
            messages: (
                await import(
                    `../../../public/locales/${context.locale}/${context.locale}.json`
                )
            ).default,
        },
    };
}
