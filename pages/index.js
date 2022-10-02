import Head from 'next/head';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Potluck Prototype</title>
      </Head>

      <main>
        <h1>Potluck Prototype</h1>

        <p>
          This is an prototype for creating wantlists for TradeMaximizer. The
          hope is that it can facilitate a math trade for things other than
          boardgames, which was the intention of the original TradeMaximizer.
          This only creates the wantlist text file that is inputted into the
          TradeMaximizer .jar file. The hope is that .jar file can be turned
          into a service or ported to javascript in the future so that
          everything can be done in this app.
        </p>

        <h2>Innovation</h2>
        <p>
          To create the wantlists instead of using a grid like the OLWLG and
          Abecorn, or setting individual values, instead we simply sort a list.
          This means that the process of evaluating trades for the user
          decreases from O(n^2) to O(n) complexity.
        </p>
        <h2>Credits and Prior Art</h2>
        <ul>
          <li>
            Used{' '}
            <a href='https://github.com/beaucarnes/mern-exercise-tracker-mongodb'>
              https://github.com/beaucarnes/mern-exercise-tracker-mongodb
            </a>{' '}
            as foundation (Mongoose may have been unnecessary)
          </li>
          <li>
            Inspiration from:{' '}
            <a href='https://github.com/abecorn/abecornlite'>
              https://github.com/abecorn/abecornlite
            </a>
            . Also the commercial site:{' '}
            <a href='https://www.abecorn.com'>abecorn.com</a>
          </li>
          <li>
            The BoardGameGeek community and everything they've done and shared
            about Math Trades -{' '}
            <a href='https://boardgamegeek.com/wiki/page/Math_Trades'>
              https://boardgamegeek.com/wiki/page/Math_Trades
            </a>
          </li>
          <li>
            The original TradeMaximizer:{' '}
            <a href='https://github.com/chrisokasaki/TradeMaximizer'>
              https://github.com/chrisokasaki/TradeMaximizer
            </a>
          </li>
          <li>
            Online Wantlist Generator:{' '}
            <a href='https://boardgamegeek.com/wiki/page/OLWLG#toc12'>
              https://boardgamegeek.com/wiki/page/OLWLG#toc12
            </a>
          </li>
          <li>
            TradeMaximizer wiki:{' '}
            <a href='https://boardgamegeek.com/wiki/page/TradeMaximizer'>
              https://boardgamegeek.com/wiki/page/TradeMaximizer
            </a>
          </li>
          <li>
            <a href='https://boardgamegeek.com/user/JeffyJeff'>
              Jeff Michaud's
            </a>{' '}
            Javascript implementation of Trade Maximizer
            <a href='https://bgg.activityclub.org/olwlg/trademax.html'>
              https://bgg.activityclub.org/olwlg/trademax.html
            </a>
          </li>
        </ul>
      </main>

      {/* <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style> */}
    </Fragment>
  );
}
