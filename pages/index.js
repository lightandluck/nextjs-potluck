import Head from 'next/head';
import { Fragment } from 'react';

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Potluck</title>
      </Head>

      <main>
        <h1>
          Potluck - <br />
          Exchange resources without money or barter
        </h1>
        <p>
          If you have a community of people looking to offer gifts, how do we
          coordinate that going to the right people? This question came to mind
          as I was working with a{' '}
          <a href='https://www.weallwegotsd.com/'>mutual aid</a> in San Diego.
        </p>
        <p>
          We put out a form asking what gifts people would want to contribute
          and received over 500 responses with offerings ranging from a drum
          set, a kid's bicycle, a remote therapy session, and so much more.
          There were so many latent resources and generosity in our community
          that we didn't have a way to coordinate.{' '}
        </p>
        <p>
          This inspired me to start building Potluck, a coordination tool that
          allows someone to add an offering, select what they would want in
          return (if anything), and then automatically be told who to give an
          item to and who to receive something from.{' '}
        </p>

        <p>
          This website currently works with just a single community and a single
          pot. It is a teaching tool for how to understand this process.
        </p>

        <p>
          This is an MVP (minimum viable product) for running Math Trades. The
          hope is that it can facilitate a math trade for things other than
          boardgames, which was the intention of the original TradeMaximizer.
        </p>

        <h2>Innovation</h2>
        <p>
          To create the wantlists instead of using a grid like the OLWLG and
          Abecorn, or setting individual values, instead we simply sort a list.
          This means that the process of evaluating trades for the user
          decreases from O(n^2) to O(n) complexity.
        </p>

        <h2>Source Code</h2>
        <ul>
          <li>
            <a href='https://gitlab.com/lightandluck/next-js-potluck'>Gitlab</a>
          </li>
          <li>
            <a href='https://github.com/lightandluck/nextjs-potluck'>Github</a>
          </li>
          <li>
            <a href='https://gitlab.com/lightandluck/potluck-prototype'>
              Old version
            </a>{' '}
            for posterity
          </li>
        </ul>

        <h2>Credits and Prior Art</h2>
        <ul>
          <li>
            Potlatch - indigenous practice that inspired this -
            <a href='https://umistapotlatch.ca/potlatch-eng.php'>
              https://umistapotlatch.ca/potlatch-eng.php
            </a>
          </li>
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
            <a href='https://boardgamegeek.com/wiki/page/TradeMaximizer#toc9'>
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
    </div>
  );
}
