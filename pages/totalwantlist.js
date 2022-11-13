import { Component } from 'react';
import axios from 'axios';

export default class TotalWantlist extends Component {
  constructor(props) {
    super(props);

    this.writeWantlist = this.writeWantlist.bind(this);

    this.state = {
      officialNamesList: '',
      wantlist: '',
      updating: true,
    };
  }

  async writeWantlist() {
    let text = document.getElementById('wantlist').textContent;
    var config = {
      headers: {
        'Content-Type': 'text/plain',
      },
    };
    await axios
      .post('/api/wantlist', text, config)
      .then((res) => {
        console.log(res.data);

        alert(res.data);
      })
      .catch((error) => console.log(error.response));
  }

  async componentDidMount() {
    await axios.get('/api/offerings').then((response) => {
      let officialNamesList = '';
      for (let item of response.data) {
        officialNamesList += `${item.officialName} ===> ${item.title} \n`;
      }

      this.setState({
        officialNamesList: officialNamesList.trim(),
      });
    });

    // TODO:
    await axios.get('/api/players').then(async (players) => {
      let wantlist = '';
      for (let player of players.data) {
        let playerWantlist = await axios.get('/api/wishlists/' + player._id);
        if (playerWantlist.data) {
          wantlist +=
            this.printWantlist(player.name, playerWantlist.data.offerings) +
            '\n';
        }
      }

      this.setState({
        wantlist: wantlist.trim(),
      });
    });
  }

  async componentDidUpdate() {
    if (this.state.updating && this.state.wantlist) {
      let text = document.getElementById('wantlist').textContent;
      var config = {
        headers: {
          'Content-Type': 'text/plain',
        },
      };
      await axios
        .post('/api/wantlist', text, config)
        .then((res) => {
          this.setState({
            updating: false,
          });
        })
        .catch((error) => console.log(error.response));
    }
  }

  // TODO: Add loading animation while wantlist is being generated
  render() {
    return (
      <div>
        {/* <input
          type='button'
          defaultValue='Upload wantlist to server'
          onClick={this.writeWantlist}
          id='btn-write-wantlist'
          readOnly
        /> */}
        {this.state.updating ? (
          <div className='alert alert-warning' style={{ color: 'black' }}>
            Updating wantlist...
          </div>
        ) : (
          <div className='alert alert-success'>
            DONE! Go to{' '}
            <a style={{ textDecoration: 'underline' }} href='/results'>
              results.
            </a>
          </div>
        )}

        <p style={{ whiteSpace: 'pre-wrap' }} id='wantlist'>
          #! ALLOW-DUMMIES {'\n'}
          #! REQUIRE-COLONS {'\n'}
          #! REQUIRE-USERNAMES {'\n'}
          #! HIDE-NONTRADES {'\n'}
          #! SHOW-ELAPSED-TIME {'\n'}
          #! ITERATIONS=50 {'\n'}
          #! SEED=2022 {'\n'}
          #! METRIC=USERS-TRADING {'\n'}
          #! SHRINK=2 {'\n'}
          #! SHRINK-VERBOSE {'\n'}
          #! SHOW-MISSING {'\n'}
          !BEGIN-OFFICIAL-NAMES {'\n'}
          {this.state.officialNamesList} {'\n'}
          !END-OFFICIAL-NAMES {'\n'}
          {this.state.wantlist} {'\n'}
        </p>
      </div>
    );
  }

  printWantlist(playerName, wishlist) {
    let wantlist = '';
    let tradeItems = '';

    for (let item of wishlist) {
      if (!item.isSteward) {
        tradeItems += item.offeringId.officialName + ' ';
      } else if (item.isSteward) {
        wantlist += `(${playerName}) ${
          item.offeringId.officialName
        } : ${tradeItems.trim()} \n`;
      }
    }

    return wantlist.trim();
  }
}
