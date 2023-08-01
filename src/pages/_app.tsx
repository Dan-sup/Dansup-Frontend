import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Dansup</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RecoilRoot>
        </QueryClientProvider>
      </CookiesProvider>
    </>
  );
}
