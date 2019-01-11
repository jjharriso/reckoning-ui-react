import React, { Component } from 'react';
import { getRoom, getStories, getActiveStory } from '../services';
import * as configurator from 'configurator/configurator';

import './Room.scss';

import StoryList from '../components/StoryList';
import VoteMachine from '../components/VoteMachine';
import Stats from '../components/Stats';
import Players from '../components/Players';


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
  }

  createSocketSubscriptions(io) {
    io.socket.on('room', async (msg) => {
      const activeStoryId = msg.data.activeStory;
      const activeStory = await getActiveStory(activeStoryId);
      this.setState({ activeStory });
    });
  }

  async componentWillMount() {
    const haveRoom = getRoom(this.state.match.params.roomId);
    const haveStories = getStories();

    const room = await haveRoom;
    const stories = await haveStories;

    this.setState({
      stories,
      room,
    });
  }

  handleActiveStoryChange(story) {
    console.log('handleActiveStoryChange', story);
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
                    activeStory={room.activeStory}
                    changeActiveStory={this.handleActiveStoryChange}/>
          <VoteMachine activeStory={activeStory}/>
          <Stats />
          <Players players={room.participations}/>
        </div>
      </div>
    );
  }
}

export default Room;
