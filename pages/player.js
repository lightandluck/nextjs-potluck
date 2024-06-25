import Head from 'next/head';
import { Component, Fragment } from 'react';
import axios from 'axios';

export default class CreatePlayer extends Component {
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
      <div className='container'>
        <Head>
          <title>Nextjs Potluck Prototype</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div>
          <h3>Create New Player</h3>
          {this.state.showSuccessAlert ? (
            <div className='alert alert-success'>
              <strong>Success!</strong> New player created.
            </div>
          ) : null}
          {this.state.showErrorAlert ? (
            <div className='alert alert-danger'>
              <strong>We're sorry!</strong> Something went wrong.
              <pre>{this.state.errorMessage}</pre>
            </div>
          ) : null}
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label>Name: </label>
              <input
                type='text'
                required
                className='form-control'
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                value='Create Player'
                className='btn btn-primary'
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
