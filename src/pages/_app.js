<<<<<<< HEAD
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
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider

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
    <SessionProvider session={session}> {/* Wrap with SessionProvider */}
      <Provider store={store}>
        <Layout>
          <GoogleAnalytics trackPageViews />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
=======
import Layout from '@/containers/Layout'
import '@/styles/globals.css'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../store'
import { hotjar } from 'react-hotjar'
import { GoogleAnalytics } from "nextjs-google-analytics"
import mixpanel from 'mixpanel-browser';
import { Crisp } from "crisp-sdk-web";
import TagManager from 'react-gtm-module'

export default function App({ Component, pageProps }) {
  
    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          
        }else{
            console.log = () => {};
            if(process.env.NEXT_PUBLIC_HOTJAR_ID)hotjar.initialize(process.env.NEXT_PUBLIC_HOTJAR_ID, 1)
            if(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN)mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {debug: false}); 
            if(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID)Crisp.configure(process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID);
            if(process.env.NEXT_PUBLIC_GTM_ID)TagManager.initialize({gtmId: process.env.NEXT_PUBLIC_GTM_ID})
        }
      }, []);

  return (
      <Provider store={store}>
          <Layout>
              <GoogleAnalytics trackPageViews />
              <Component {...pageProps} />
          </Layout>
      </Provider>
  )
}
>>>>>>> 2503ac3bcb614024f835f57f0d18110f3b8e7d37
