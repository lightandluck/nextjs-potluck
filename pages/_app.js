import Navbar from '../components/Navbar';
import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/bootstrap.min.css';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <meta charset='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <link rel='icon' href='/favicon.ico' />
        <script src='/lib/jquery-3.3.1.slim.min.js'></script>
        {/* original path: https://code.jquery.com/jquery-3.3.1.slim.min.js 
          integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo'
          crossOrigin='anonymous'
        */}
        <script src='/lib/popper.min.js'></script>
        {/* original path: https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js 
          integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1'
          crossOrigin='anonymous'
        */}
        <script src='/lib/bootstrap.min.js'></script>
        {/* original path: https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js 
          integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM'
          crossOrigin='anonymous'
        */}
        <script
          src='https://upload-widget.cloudinary.com/global/all.js'
          crossOrigin='anonymous'></script>
        <script src='/scripts/tradeMax-util.js' />
      </Head>
      <Navbar />

      <Component {...pageProps} />
    </Fragment>
  );
}

// TODO: Get and/or set seed when app starts
