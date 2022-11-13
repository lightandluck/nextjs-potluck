import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// const GripIcon = require('@zendeskgarden/svg-icons/src/12/grip.svg').default;

const DraggableRow = styled.tr`
  ${(props) =>
    props.isDraggingOver
      ? `
    :hover {
      background-color: inherit !important;
    }
  `
      : ''};
`;

class DraggableCell extends React.Component {
  constructor() {
    super();

    this.setRef = this.setRef.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (!this.ref) {
      return null;
    }

    const isDragStarting =
      this.props.isDragOccurring && !prevProps.isDragOccurring;

    if (!isDragStarting) {
      return null;
    }

    const { width, height } = this.ref.getBoundingClientRect();

    const snapshot = {
      width,
      height,
    };

    return snapshot;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const ref = this.ref;

    if (!ref) {
      return;
    }

    if (snapshot) {
      if (ref.style.width === snapshot.width) {
        return;
      }
      ref.style.width = `${snapshot.width}px`;
      ref.style.maxWidth = `${snapshot.width}px`;
      ref.style.height = `${snapshot.height}px`;
      return;
    }

    if (this.props.isDragOccurring) {
      return;
    }

    // inline styles not applied
    if (ref.style.width == null) {
      return;
    }

    // no snapshot and drag is finished - clear the inline styles
    ref.style.removeProperty('height');
    ref.style.removeProperty('width');
    ref.style.removeProperty('maxWidth');
  }

  setRef(ref) {
    this.ref = ref;
  }

  render() {
    return <td ref={this.setRef}>{this.props.children}</td>;
  }
}

// const DraggableContainer = styled.div`
//   :focus {
//     outline: none;
//   }
// `;

// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class DraggableExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: '',
      playerId: '',
      players: [],
      wishlistItems: [],
      wantlist: '',
    };

    this.currentPlayer = React.createRef();
    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.printWantlist = this.printWantlist.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/players')
      .then((response) => {
        if (response.data.length > 0) {
          let playerData = response.data,
            playerId = localStorage.getItem('playerId') || playerData[0]._id,
            playerName =
              localStorage.getItem('playerName') || playerData[0].name;

          this.setState({
            players: playerData.map((player) => {
              return { name: player.name, _id: player._id };
            }),
            playerName: playerName,
            playerId: playerId,
          });

          axios
            .get('/api/wishlists/' + playerId)
            .then((response) => {
              if (!response.data) {
                this.setState({
                  wishlistItems: [],
                });
              } else {
                this.setState({
                  wishlistItems: response.data.offerings,
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangePlayerName(e) {
    let idx = e.target.selectedIndex;
    let dataset = e.target.options[idx].dataset;

    axios
      .get('/api/wishlists/' + dataset.playerid)
      .then((response) => {
        if (response.data === null) {
          this.setState({
            wishlistItems: [],
          });
        } else {
          this.setState({
            wishlistItems: response.data.offerings || [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    localStorage.setItem('playerName', e.target.value);
    localStorage.setItem('playerId', dataset.playerid);

    this.setState({
      playerName: e.target.value,
      playerId: dataset.playerid,
      wantlist: '',
    });
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const wishlistItems = reorder(
      this.state.wishlistItems,
      result.source.index,
      result.destination.index
    );

    // Create an array of only fields needed to update wishlist
    let updateWishlist = wishlistItems.map(function (item) {
      return {
        isSteward: item['isSteward'],
        offeringId: item['offeringId']._id,
      };
    });

    axios
      .put('/api/wishlists/' + this.state.playerId, updateWishlist)
      .then((res) => {
        console.log(res.data);
      });

    this.setState(
      {
        wishlistItems,
      },
      () => {
        document.getElementById(result.draggableId).focus();
      }
    );
  }

  printWantlist() {
    let wishlist = this.state.wishlistItems;
    let wantlist = '';
    let tradeItems = '';
    let playerName = this.state.playerName;

    for (let item of wishlist) {
      if (!item.isSteward) {
        tradeItems += item.offeringId.officialName + ' ';
      } else if (item.isSteward) {
        wantlist += `(${playerName}) ${
          item.offeringId.officialName
        } : ${tradeItems.trim()} \n`;
      }
    }

    this.setState({ wantlist: wantlist.trim() });
  }

  render() {
    return (
      <React.Fragment>
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
                  key={player.name}
                  value={player.name}
                  data-playerid={player._id}>
                  {player.name}
                </option>
              );
            })}
          </select>

          <div className='wishlist-info'>
            <h3>Sort your wishlist</h3>
            <p>
              Sort list by moving things you want towards the top. Any of your
              items below another offering means that you are willing to trade
              your item for the ones above it.
            </p>
            <div className='printed-wishlist'>
              <button
                type='button'
                className='btn btn-primary btn-small'
                onClick={this.printWantlist}>
                Print Wishlist
              </button>
              <p>
                You can view what your trades will look like by pressing the
                button.
              </p>
              <p style={{ whiteSpace: 'pre-wrap' }}>{this.state.wantlist}</p>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <table className='table wishlist-table'>
            <thead>
              <tr>
                {/* <HeaderCell isMinimum /> */}
                <th></th>
                <th>Player</th>
                <th>Title</th>
                <th>Description</th>
                <th>Photos</th>
              </tr>
            </thead>
            <Droppable droppableId='droppable'>
              {(provided, droppableSnapshot) => {
                return (
                  <tbody
                    ref={provided.innerRef}
                    isDraggingOver={droppableSnapshot.isDraggingOver}>
                    {this.state.wishlistItems.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}>
                        {(provided, snapshot) => (
                          <DraggableRow
                            className={
                              item.isSteward ? 'offering' : 'potluck-item'
                            }
                            ref={provided.innerRef}
                            // isDragging={snapshot.isDragging}
                            // isDraggingOver={droppableSnapshot.isDraggingOver}
                            // isHovered={snapshot.isDragging}
                            // isFocused={
                            //   droppableSnapshot.isDraggingOver ? snapshot.isDragging : undefined
                            // }
                            {...provided.draggableProps.style}
                            {...provided.draggableProps}
                            id={item._id}
                            {...provided.dragHandleProps}>
                            <DraggableCell
                              isDragOccurring={snapshot.isDragging}>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='12'
                                height='12'
                                viewBox='0 0 12 12'
                                focusable='false'
                                role='presentation'>
                                <g fill='currentColor'>
                                  <rect
                                    width='2'
                                    height='2'
                                    x='3'
                                    y='1'
                                    rx='0.5'
                                    ry='0.5'></rect>
                                  <rect
                                    width='2'
                                    height='2'
                                    x='7'
                                    y='1'
                                    rx='0.5'
                                    ry='0.5'></rect>
                                  <rect
                                    width='2'
                                    height='2'
                                    x='3'
                                    y='5'
                                    rx='0.5'
                                    ry='0.5'></rect>
                                  <rect
                                    width='2'
                                    height='2'
                                    x='7'
                                    y='5'
                                    rx='0.5'
                                    ry='0.5'></rect>
                                  <rect
                                    width='2'
                                    height='2'
                                    x='3'
                                    y='9'
                                    rx='0.5'
                                    ry='0.5'></rect>
                                  <rect
                                    width='2'
                                    height='2'
                                    x='7'
                                    y='9'
                                    rx='0.5'
                                    ry='0.5'></rect>
                                </g>
                              </svg>
                            </DraggableCell>
                            <DraggableCell
                              isDragOccurring={snapshot.isDragging}>
                              {item.offeringId.playerName}
                            </DraggableCell>
                            <DraggableCell
                              isDragOccurring={snapshot.isDragging}>
                              {item.offeringId.title}
                            </DraggableCell>
                            <DraggableCell
                              isDragOccurring={snapshot.isDragging}>
                              {item.offeringId.description}
                            </DraggableCell>
                            <DraggableCell
                              isDragOccurring={snapshot.isDragging}>
                              {item.offeringId.imageURLs.length > 0 ? (
                                <img src={item.offeringId.imageURLs[0]} />
                              ) : (
                                <img src='https://res.cloudinary.com/dkp0gitg9/image/upload/v1668128230/potluck-images/image-placeholder-icon-16_w73xsu.png' />
                              )}
                            </DraggableCell>
                          </DraggableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                );
              }}
            </Droppable>
          </table>
        </DragDropContext>
      </React.Fragment>
    );
  }
}
<DraggableExample />;
