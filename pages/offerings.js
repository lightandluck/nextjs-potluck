import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default class OfferingsList extends Component {
  constructor(props) {
    super(props);

    this.deleteOffering = this.deleteOffering.bind(this);
    this.addToWishlist = this.addToWishlist.bind(this);

    this.state = {
      playerName: '',
      playerId: '',
      offerings: [],
      players: [],
    };

    this.currentPlayer = React.createRef();
    this.onChangePlayerName = this.onChangePlayerName.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/offerings')
      .then((response) => {
        this.setState({ offerings: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

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
        console.log(error);
      });
  }

  async deleteOffering(id) {
    await axios.delete('/api/offerings/' + id).then((response) => {
      console.log(response.data);
    });

    await axios
      .get('/api/offerings')
      .then((response) => {
        this.setState({ offerings: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToWishlist(offering) {
    const wishedItem = {
      playerId: this.state.playerId,
      offeringId: offering._id,
      isSteward: false,
    };

    axios
      .post('/api/wishlists', wishedItem)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  offeringsList() {
    let currentPlayerName = this.state.playerName;
    return this.state.offerings
      .filter((el) => el.playerName === currentPlayerName)
      .map((currentoffering) => {
        return (
          <Offering
            offering={currentoffering}
            deleteOffering={this.deleteOffering}
            key={currentoffering._id}
          />
        );
      });
  }

  // TODO: Figure out how to show only items not on wishlist ---- further, already viewed maybe
  potluckList() {
    let currentPlayerName = this.state.playerName;
    return this.state.offerings
      .filter((el) => el.playerName !== currentPlayerName)
      .map((currentoffering) => {
        return (
          <PotluckItem
            offering={currentoffering}
            addToWishlist={this.addToWishlist}
            key={currentoffering._id}
          />
        );
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

  render() {
    return (
      <div>
        <div className='form-group'>
          <label>Player name: </label>
          <select
            ref={this.currentPlayer}
            required
            className='form-control'
            value={this.state.playerName}
            onChange={this.onChangePlayerName}>
            {this.state.players.map(function (player) {
              return (
                <option
                  key={player._id}
                  value={player.name}
                  data-playerid={player._id}>
                  {player.name}
                </option>
              );
            })}
          </select>
        </div>
        <h3>Your Offerings</h3>
        <table className='table'>
          <tbody>
            <tr className='table-info'>
              <th>Player name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            {this.offeringsList()}
          </tbody>
        </table>
        <h3>Potluck Offerings</h3>
        <table className='table'>
          <caption></caption>
          <tbody>
            <tr className='table-primary'>
              <th>Player name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
            {this.potluckList()}
          </tbody>
        </table>
      </div>
    );
  }
}

// TODO: Add confirmation to delete action!
function Offering({ offering, deleteOffering }) {
  return (
    <tr>
      <td>{offering.playerName}</td>
      <td>{offering.title}</td>
      <td>{offering.description}</td>
      <td>
        <button type='button' className='btn btn-info btn-sm'>
          <Link href={'/edit/' + offering._id}>Edit</Link>
        </button>{' '}
        <Link href='' passHref>
          <a
            className='deleteLink'
            onClick={() => {
              deleteOffering(offering._id);
            }}>
            Delete
          </a>
        </Link>
      </td>
    </tr>
  );
}

// TODO: Figure out how to show only items not on wishlist ---- further, already viewed maybe
function PotluckItem({ offering, addToWishlist }) {
  return (
    <tr>
      <td>{offering.playerName}</td>
      <td>{offering.title}</td>
      <td>{offering.description}</td>
      <td>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={() => addToWishlist(offering)}>
          + wishlist
        </button>
      </td>
    </tr>
  );
}
