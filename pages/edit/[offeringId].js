import React, { Component } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';

export class EditOffering extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      playerName: '',
      playerId: '',
      officialName: '',
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    const { offeringId } = this.props.router.query;

    axios
      .get('/api/offerings/' + offeringId)
      .then((response) => {
        this.setState({
          playerName: response.data.playerName,
          playerId: response.data.playerId,
          officialName: response.data.officialName,
          title: response.data.title,
          description: response.data.description,
        });
      })
      .catch((error) => {
        console.log(error);
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
    const { offeringId } = this.props.router.query;

    const offering = {
      playerName: this.state.playerName,
      officialName: this.state.officialName,
      title: this.state.title,
      description: this.state.description,
    };

    console.log(offering);

    axios
      .put('/api/offerings/' + offeringId, offering)
      .then((res) => {
        const offeringInList = {
          playerId: this.state.playerId,
          offeringId: offeringId,
          isSteward: true,
        };

        // TODO: the item updates, and so does wishlist, but we're getting a console error

        // TODO: The call below doesn't seem necessary now. What was it's purpose before???
        //        Probably had something to do with the isSteward flag, but that wasn't really ////         fleshed out and no documentation is sad =(
        // axios
        //   .post('api/wishlists', offeringInList)
        //   .then((res) => {
        //     console.log('worked?');
        //     console.log(res.data);
        //     window.location = '/';
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>Edit Offering Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Player name: </label>
            <p>{this.state.playerName}</p>
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
              value='Edit Offering'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditOffering);
