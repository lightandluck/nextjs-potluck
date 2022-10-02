import { Component } from 'react';
import axios from 'axios';

export default class TotalWantlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      officialNamesList: '',
      wantlist: '',
    };
  }

  async componentDidMount() {
    await axios.get('/api/offerings').then((response) => {
      let officialNamesList = '';
      for (let item of response.data) {
        officialNamesList += `${item.officialName} ===> ${item.title} (from ${item.playerName}) \n`;
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

  // TODO: Add loading animation while wantlist is being generated
  render() {
    return (
      <div>
        <p style={{ whiteSpace: 'pre-wrap' }}>
          #! ALLOW-DUMMIES <br />
          #! REQUIRE-COLONS <br />
          #! REQUIRE-USERNAMES <br />
          #! HIDE-NONTRADES <br />
          #! SHOW-ELAPSED-TIME <br />
          #! ITERATIONS=50 <br />
          #! SEED=2022 <br />
          #! METRIC=USERS-TRADING <br />
          #! SHRINK=2 <br />
          #! SHRINK-VERBOSE <br />
          #! SHOW-MISSING <br />
          !BEGIN-OFFICIAL-NAMES <br />
          {this.state.officialNamesList} <br />
          !END-OFFICIAL-NAMES <br />
          {this.state.wantlist}
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
