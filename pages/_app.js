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
        <script
          src='https://code.jquery.com/jquery-3.3.1.slim.min.js'
          integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo'
          crossOrigin='anonymous'
        ></script>
        <script
          src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'
          integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1'
          crossOrigin='anonymous'
        ></script>
        <script
          src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
          integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM'
          crossOrigin='anonymous'
        ></script>
      </Head>
      <Navbar />
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </Fragment>
  );
}

// TODO: Get and/or set seed when app starts
