import useLogin from '@/hook/useLogin';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type ValueSubmit = {
    username: string;
};

export default function LoginPage() {
    const { t } = useTranslation('common');
    const { onLogin, isLoading } = useLogin();
    const onFinish = async (values: ValueSubmit) => {
        const { username } = values;
        if (username) onLogin(username);
    };
    return (
        <section className="min-w-screen min-h-screen bg-background flex flex-col justify-center items-center">
            <h1 className="text-[32px] leading-10">{t('loginPage.title')}</h1>
            {isLoading && <p>Loading...</p>}
            <Form name="simple_form" onFinish={onFinish} layout="vertical">
                <Form.Item
                    label={t('loginPage.label')}
                    name="username"
                    rules={[
                        { required: true, message: 'Please input something!' },
                    ]}
                >
                    <Input
                        placeholder={t('loginPage.placeholder')}
                        className="rounded"
                    />
                </Form.Item>

                <Form.Item className="flex justify-center">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-button rounded text-black"
                    >
                        {t('loginPage.button')}
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
