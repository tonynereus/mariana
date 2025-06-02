import React, { Fragment } from 'react';
import { wrapper } from '../store';

// types
import type { AppProps } from 'next/app';

// global styles
import 'swiper/swiper.scss';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';

import AppContextProvider from 'context/AppContext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  </Fragment>
);

export default wrapper.withRedux(MyApp);
