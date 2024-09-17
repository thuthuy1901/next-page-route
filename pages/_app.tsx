import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IntlProvider } from 'use-intl';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { messages, ...rest } = pageProps;
    return (
        <IntlProvider locale={router?.locale || 'en'} messages={messages}>
            <Component {...rest} />;
            <ToastContainer />
        </IntlProvider>
    );
}
