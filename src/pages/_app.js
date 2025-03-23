import Layout from '@/containers/Layout';
import '@/styles/globals.css';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { hotjar } from 'react-hotjar';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import mixpanel from 'mixpanel-browser';
import { Crisp } from 'crisp-sdk-web';
import TagManager from 'react-gtm-module';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // Development-specific code (if any)
    } else {
      console.log = () => {}; // Disable console.log in production
      if (process.env.NEXT_PUBLIC_HOTJAR_ID) hotjar.initialize(process.env.NEXT_PUBLIC_HOTJAR_ID, 1);
      if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, { debug: false });
      if (process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID);
      if (process.env.NEXT_PUBLIC_GTM_ID) TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <GoogleAnalytics trackPageViews />
          {/* Toast Container for notifications */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastClassName="!bg-slate-800 !text-slate-100 !rounded-lg !shadow-xl"
            progressClassName="!bg-blue-500"
            bodyClassName="!text-sm !font-medium"
            />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}