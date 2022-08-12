import React, { Component } from 'react';
import axios from 'axios';

// TODO:  Add feedback after done creating offering. Where to go afterwards?
//        Can send user to blank form to create another offering,
//        or send them to the list??? Need advice

export default class CreateOffering extends Component {
  constructor(props) {
    super(props);

    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      playerName: '',
      playerId: '',
      title: '',
      description: '',
      players: [],
      showSuccessAlert: false,
      showErrorAlert: false,
      errorMessage: '',
    };

    this.playerInput = React.createRef();
  }

  componentDidMount() {
    axios
      .get('/api/players')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            players: response.data.map((player) => {
              return { name: player.name, _id: player._id };
            }),
            playerName:
              localStorage.getItem('playerName') || response.data[0].name,
            playerId: localStorage.getItem('playerId') || response.data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  onChangePlayerName(e) {
    let idx = e.target.selectedIndex;
    let dataset = e.target.options[idx].dataset;

    localStorage.setItem('playerName', e.target.value);
    localStorage.setItem('playerId', dataset.playerid);

    this.setState({
      playerName: e.target.value,
      playerId: dataset.playerid,
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    const offering = {
      playerName: this.state.playerName,
      playerId: this.state.playerId,
      title: this.state.title,
      description: this.state.description,
    };

    await axios
      .post('/api/offerings', offering)
      .then((res) => {
        // TODO: Fix this to match wishlist schema??
        // Add new offering to personal wishlist, designate as steward
        const offeringInList = {
          playerId: res.data.playerId,
          offeringId: res.data._id,
          isSteward: true,
        };

        axios
          .post('/api/wishlists', offeringInList)
          .then((res) => {
            console.log(res.data);
            console.log(offering);

            this.setState({
              showSuccessAlert: true,
              description: '',
              title: '',
            });
          })
          .catch((res) => {
            console.log('Error: ');
            console.log(res);
            this.setState({
              showErrorAlert: true,
              errorMessage: res.message,
            });
          });
      })
      .catch((res) => {
        console.log('Error: ');
        console.log(res.message);
        this.setState({
          showErrorAlert: true,
          errorMessage: res.message,
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Create New Offering</h3>
        {this.state.showSuccessAlert ? (
          <div className='alert alert-success'>
            <strong>Success!</strong> New offering created.
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
            <label>Player name: </label>
            <select
              ref={this.playerInput}
              required
              className='form-control'
              value={this.state.playerName}
              onChange={this.onChangePlayerName}>
              {this.state.players.map(function (player) {
                return (
                  <option
                    key={player._id}
                    data-playerid={player._id}
                    value={player.name}>
                    {player.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Title: </label>
            <input
              type='text'
              className='form-control'
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className='form-group'>
            <label>Description: </label>
            <textarea
              className='form-control'
              value={this.state.description}
              onChange={this.onChangeDescription}></textarea>
          </div>

          <div className='form-group'>
            <input
              type='submit'
              value='Create Offering'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
