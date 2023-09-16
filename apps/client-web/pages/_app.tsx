import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { Header } from '../features/layout/header';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';
import BackendLauncherProvider from '../features/core/BackendLauncherProvider';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer } from 'react-toastify';
import WagmiConfigProvider from '../config/WagmiConfigProvider';
import AppBar from '../features/layout/header/header-v2';
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
      <WagmiConfigProvider>
        <SessionProvider session={session}>
          <CacheProvider value={emotionCache}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                {/* <BackendLauncherProvider> */}
                {/* <Header /> */}
                <AppBar />
                <Component {...pageProps} />
                <ToastContainer autoClose={3000} />
                {/* </BackendLauncherProvider> */}
              </ThemeProvider>
            </LocalizationProvider>
          </CacheProvider>
        </SessionProvider>
      </WagmiConfigProvider>
    </QueryClientProvider>
  );
}

export default CustomApp;
