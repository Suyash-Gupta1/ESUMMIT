import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Flowfest 2025</title>
        <meta name="description" content="A retro-styled interactive festival site." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        {/* mode="wait" ensures the exit animation completes before the new page enters */}
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={router.asPath}>
             <Component {...pageProps} />
          </PageTransition>
        </AnimatePresence>
      </Layout>
    </>
  );
}
