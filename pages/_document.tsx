import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="antialiased bg-background text-black">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
