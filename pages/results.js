import Head from 'next/head';
import { Component, Fragment } from 'react';
import axios from 'axios';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      showSuccessAlert: false,
      showErrorAlert: false,
      errorMessage: '',
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    // ADDTEST: Changed object to not have name field ex: {yaya: this.state.name}
    const user = {
      name: this.state.name,
    };

    await axios
      .post('/api/players', user)
      .then((res) => {
        console.log('Player added:');
        console.log(res.data);

        const { name, _id } = res.data;
        localStorage.setItem('playerName', name);
        localStorage.setItem('playerId', _id);

        this.setState({ showSuccessAlert: true });
        // Redirects to /create, so user can begin creating offerings immediately
        // window.location = '/create';
      })
      .catch((error) => console.log(error.response));
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>Nextjs Potluck Prototype</title>
          <link rel='icon' href='/favicon.ico' />
          <script src='/scripts/doShit.js' />
        </Head>
        <p>Enter the url of TradeMaximizer input (aka wants) and submit</p>
        <input id='url' value='testwants.txt' />
        {/* // TODO: How do we call functions from external scripts???? */}
        <input type='submit' value='Run' onClick='doit()' id='runnow' />
        <div id='progress'></div>
        <form encType='multipart/form-data' method='POST' action='upload.html'>
          <input id='listid' type='hidden' name='listid' value='' />
          <input type='hidden' name='what' value='results' />
          <input type='hidden' name='filetype' value='text' />
          <input
            type='hidden'
            name='fileupload'
            value='from TradeMaxizer Javascript'
          />
          <input type='hidden' name='direct' value='1' />
          <input type='hidden' name='results' id='fileupload' />
          <input
            type='submit'
            name='submit'
            value='Upload Now'
            disabled='disabled'
            id='uploadnow'
          />
          <br />
          <input type='checkbox' name='makepending' checked='checked' />
          check this box if you want these results to be marked pending until
          you mark them official
          <br />
          <input type='checkbox' name='donotnotify' />
          check this box if you do not want users who are subscribed to be
          notified of this upload
        </form>
        <div className='results' id='output'></div>
      </Fragment>
    );
  }
}
