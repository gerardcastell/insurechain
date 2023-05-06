import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { Header } from '@insurechain/web/core/feature';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';
import BackendLauncherProvider from '../features/core/BackendLauncherProvider';

const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function CustomApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <title>Insurechain</title>
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <BackendLauncherProvider>
              <Header />
              <Component {...pageProps} />
            </BackendLauncherProvider>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
