import Head from 'next/head';
import { Component, Fragment } from 'react';
import axios from 'axios';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    // this.copytoclipboard = this.copytoclipboard.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    window.doit();
  }

  // copytoclipboard(e) {
  //   e.preventDefault();
  //   window.copytoclipboard('output');
  // }

  render() {
    return (
      <div className='container results-container'>
        <Head>
          <title>Nextjs Potluck Results</title>
          <link rel='icon' href='/favicon.ico' />
          <script src='/scripts/runTrade.js' />
        </Head>
        {/* <input readOnly id='url' defaultValue='tmp/wantlist.txt' /> */}
        {/* // TODO: How do we call functions from external scripts???? */}
        <input
          readOnly
          type='button'
          defaultValue='Run'
          onClick={this.onSubmit}
          id='runnow'
        />
        <div id='progress'></div>

        <br />
        <div className='results' id='output'></div>
        <br />
      </div>
    );
  }
}
