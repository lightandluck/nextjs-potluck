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
      <Fragment>
        <Head>
          <title>Nextjs Potluck Prototype</title>
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
        {/* <form encType='multipart/form-data' method='POST' action='upload.html'>
          <input id='listid' type='hidden' name='listid' value='' />
          <input type='hidden' name='what' value='results' />
          <input type='hidden' name='filetype' value='text' />
          <input
            type='hidden'
            name='fileupload'
            value='from TradeMaxizer Javascript'
          />
          <input type='hidden' name='direct' value='1' />
        </form> */}

        <br />
        <div className='results' id='output'></div>
        <br />
        {/* <input
          readOnly
          type='button'
          defaultValue='Copy Results'
          onClick={this.copytoclipboard}
          id='copy-results'
        /> */}
      </Fragment>
    );
  }
}
