import React, { Component } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { withRouter } from 'next/router';
import axios from 'axios';
import PhotoPreview from '../../components/PhotoPreview';

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}

export class EditOffering extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.setupWidget = this.setupWidget.bind(this);

    this.state = {
      playerName: '',
      playerId: '',
      officialName: '',
      title: '',
      description: '',
      imageURLs: [],
    };
  }

  setupWidget() {
    if (window.cloudinary) {
      let myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dkp0gitg9',
          uploadPreset: 'potluck-images',
          sources: ['local', 'camera'],
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
            this.setState((prevState) => ({
              imageURLs: [...prevState.imageURLs, result.info.url],
            }));
          }
        }
      );

      document.getElementById('upload_widget').addEventListener(
        'click',
        function (e) {
          e.preventDefault();
          myWidget.open();
        },
        false
      );
    } else {
      document.getElementById('upload_widget').style.display = 'none';
    }
  }

  async componentDidMount() {
    this.setupWidget();

    const { offeringId } = this.props.router.query;

    await axios
      .get('/api/offerings/' + offeringId)
      .then((response) => {
        this.setState({
          playerName: response.data.playerName,
          playerId: response.data.playerId,
          officialName: response.data.officialName,
          title: response.data.title,
          description: response.data.description,
          imageURLs: response.data.imageURLs,
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

  onCancel(e) {
    window.location = '/offerings';
  }

  async onSubmit(e) {
    e.preventDefault();
    const { offeringId } = this.props.router.query;

    const offering = {
      playerName: this.state.playerName,
      officialName: this.state.officialName,
      title: this.state.title,
      description: this.state.description,
      imageURLs: this.state.imageURLs,
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

        window.location = '/offerings';

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
        <h3>Edit Offering</h3>
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
          <button id='upload_widget' className='btn btn-warning'>
            Upload photo
          </button>

          {this.state.imageURLs.length ? (
            <PhotoPreview imageURLs={this.state.imageURLs} />
          ) : (
            ''
          )}

          <hr />

          <div className='form-group d-flex justify-content-between'>
            <input
              type='submit'
              value='Edit Offering'
              className='btn btn-primary'
            />
            <input
              type='button'
              value='Cancel'
              className='btn btn-secondary'
              onClick={this.onCancel}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditOffering);
