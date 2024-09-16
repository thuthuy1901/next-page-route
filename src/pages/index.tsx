import useLogin from '@/hook/useLogin';
import { Button, Form, Input } from 'antd';
import { useTranslations } from 'use-intl';

type ValueSubmit = {
    username: string;
};

export default function LoginPage() {
    const t = useTranslations('loginPage');
    const { onLogin, isLoading } = useLogin();
    const onFinish = async (values: ValueSubmit) => {
        const { username } = values;
        if (username) onLogin(username);
    };
    return (
        <section className="min-w-screen min-h-screen bg-background flex flex-col justify-center items-center">
            <h1 className="text-[32px] leading-10">{t('title')}</h1>
            {isLoading && <p>Loading...</p>}
            <Form name="simple_form" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label={t('label')}
                    name="username"
                    rules={[
                        { required: true, message: 'Please input something!' },
                    ]}
                >
                    <Input placeholder={t('placeholder')} className="rounded" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-button rounded text-black"
                    >
                        {t('button')}
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}

export async function getStaticProps(context: any) {
    return {
        props: {
            messages: (
                await import(
                    `../../public/locales/${context.locale}/${context.locale}.json`
                )
            ).default,
        },
    };
}
