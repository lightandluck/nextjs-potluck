import React, { Component } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';
import PhotoPreview from '../../components/PhotoPreview';

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}

export class ViewOffering extends Component {
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      playerName: '',
      playerId: '',
      officialName: '',
      title: '',
      description: '',
      imageURLs: [],
    };
  }

  async componentDidMount() {
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

  onCancel(e) {
    window.location = '/offerings';
  }

  render() {
    return (
      <div>
        <h3>View Offering</h3>
        <hr />
        <form>
          <div className='form-group'>
            <label>Player name: </label>
            <h4>{this.state.playerName}</h4>
          </div>
          <div className='form-group'>
            <label>Title: </label>
            <h4>{this.state.title}</h4>
          </div>
          <div className='form-group'>
            <label>Description: </label>
            <h4>{this.state.description}</h4>
          </div>
          <hr />
          {this.state.imageURLs.length ? (
            <PhotoPreview imageURLs={this.state.imageURLs} />
          ) : (
            ''
          )}

          <hr />

          <input
            type='button'
            value='Back'
            className='btn btn-secondary'
            onClick={this.onCancel}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(ViewOffering);
