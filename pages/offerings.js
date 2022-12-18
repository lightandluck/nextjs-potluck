import React, { Component, Fragment } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';

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
    let result = await confirm('Are you sure you want to delete?');
    if (result) {
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
  }

  addToWishlist(offering, e) {
    console.log(e);

    e.preventDefault();

    // The event handler is on the button. This logic tries
    // to find the correct element to change the span text within the button
    // to provide feedback. We have this logic because event
    // propagation means that the triggering element is inconsistent.
    let elem = e.target.closest('.bi-journal-plus');
    if (elem === null) {
      elem = e.target.querySelector('.bi-journal-plus');
    }

    const wishedItem = {
      playerId: this.state.playerId,
      offeringId: offering._id,
      isSteward: false,
    };

    axios
      .post('/api/wishlists', wishedItem)
      .then((res) => {
        elem.classList.add('bi-check-square');
        elem.classList.remove('bi-journal-plus');
        elem.innerHTML = '<span class="btn-text">Added!</span>';
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
      <Fragment>
        <Head>
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css'
          />
        </Head>
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
          <h3 className='offerings-header'>Your Offerings</h3>
          <ul className='gallery'>{this.offeringsList()}</ul>

          <h3 className='potluck-header'>Potluck Offerings</h3>
          <ul className='gallery'>{this.potluckList()}</ul>
        </div>
      </Fragment>
    );
  }
}

// TODO: Add confirmation to delete action!
function Offering({ offering, deleteOffering }) {
  return (
    <li>
      {/* {console.log(offering)} */}
      <div className='info'>
        <div>
          <strong>{offering.title}</strong>
        </div>
        <div>{offering.description}</div>
      </div>
      {offering.imageURLs.length > 0 ? (
        <img src={offering.imageURLs[0]} />
      ) : (
        <img
          style={{ width: '250px' }}
          src='https://res.cloudinary.com/dkp0gitg9/image/upload/v1668128230/potluck-images/image-placeholder-icon-16_w73xsu.png'
        />
      )}

      <div className='actions'>
        <button type='button' className='edit-btn btn btn-info'>
          <Link href={'/edit/' + offering._id}>
            <span className='bi-pencil-square'>
              <span className='btn-text'>Edit</span>
            </span>
          </Link>
        </button>{' '}
        <button type='button' className='delete-btn btn btn-dark'>
          <span
            className='bi-trash'
            onClick={() => {
              deleteOffering(offering._id);
            }}>
            <span className='btn-text'>Delete</span>
          </span>
        </button>
      </div>
    </li>
  );
}

// TODO: Figure out how to show only items not on wishlist ---- further, already viewed maybe
function PotluckItem({ offering, addToWishlist }) {
  return (
    <li>
      {/* {console.log(offering)} */}
      <div className='info'>
        <div>
          <strong>{offering.title}</strong>
        </div>
        <div>{offering.description}</div>
      </div>
      {offering.imageURLs.length > 0 ? (
        <img src={offering.imageURLs[0]} />
      ) : (
        <img src='https://res.cloudinary.com/dkp0gitg9/image/upload/v1668128230/potluck-images/image-placeholder-icon-16_w73xsu.png' />
      )}

      <div className='actions'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={(e) => {
            addToWishlist(offering, e);
          }}>
          <span className='bi-journal-plus'>
            <span className='btn-text'>Wishlist</span>
          </span>
        </button>

        <button type='button' className='btn btn-warning'>
          <Link href={'/view/' + offering._id}>
            <span className='bi-eye'>
              <span className='btn-text'>View</span>
            </span>
          </Link>
        </button>
      </div>
    </li>
  );
}
