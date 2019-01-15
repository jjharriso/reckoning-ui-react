import React, { Component } from 'react';
import {
  getRoom,
  getStories,
  getActiveStory,
  changeActiveStory,
  addVote,
} from '../services';
import * as configurator from 'configurator/configurator';

import './Room.scss';

import StoryList from '../components/StoryList/StoryList';
import VoteMachine from '../components/VoteMachine/VoteMachine';
import Stats from '../components/Stats/Stats';
import Players from '../components/Players/Players';


class Room extends Component {
  config = configurator.config;

  constructor(props) {
    const { match, io } = props;
    super(props);
    this.state = {
      match,
      stories: [],
      room: {
        id: null,
        activeStory: null,
        participations: [],
      },
      activeStory: {
        name: null,
        description: null,
      },
    };
    this.createSocketSubscriptions(io);
    this.handleChangeActiveStory = this.handleChangeActiveStory.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  createSocketSubscriptions(io) {
    io.socket.on('room', async (msg) => {
      // need to generalize the setState part for any room changes
      const activeStoryId = msg.data.activeStory;
      const activeStory = await getActiveStory(activeStoryId);
      this.setState({ activeStory });
    });

    io.socket.on('vote', async (msg) => {
      console.log(msg);
      // const activeStoryId = msg.data.activeStory;
      // const activeStory = await getActiveStory(activeStoryId);
      // this.setState({ activeStory });
    });
  }

  async componentWillMount() {
    const haveRoom = getRoom(this.state.match.params.roomId);
    const haveStories = getStories();

    const room = await haveRoom;
    const stories = await haveStories;

    const activeStory = await getActiveStory(room.activeStory.id);

    this.setState({
      stories,
      room,
      activeStory,
    });
  }

  async handleChangeActiveStory(story) {
    const activeStory = await changeActiveStory(this.state.room.id, story);
    this.setState({ activeStory });
  }

  async handleVote(vote) {
    console.log(vote);
    console.log(this.state.activeStory.id);
    const result = await addVote(vote, this.state.activeStory)
    console.log(result);
    const activeStory = await getActiveStory(this.state.activeStory.id);
    this.setState({
      activeStory,
    });
  }

  async updateStory(deets) {
    const Description = deets.target.innerHTML;
    // update rally story
  }

  render() {
    const { 
      stories,
      room,
      activeStory,
    } = this.state;

    return (
      <div className="Room">
        <h1>{room.id || 'No Room'}</h1>
        <p className="lead">
          Everything is a
          <span className="blink">&nbsp;WIP</span>.
            Look and Feel will dramatically change. Just providing a visual grouping of components to aid in dev work.
        </p>
        <div className="poker-bits">
          <StoryList stories={stories}
                    changeActiveStory={this.handleChangeActiveStory}/>
          <VoteMachine activeStory={activeStory}
                    handleVote={this.handleVote}
                    updateStory={this.updateStory}/>
          <Stats votes={activeStory.votes}/>
          <Players players={room.participations}/>
        </div>
      </div>
    );
  }
}

export default Room;
