import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'antd/dist/reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import nextI18nConfig from '../next-i18next.config';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />;
            <ToastContainer />
        </>
    );
}

export default appWithTranslation(App, nextI18nConfig);
