import React, { Component } from 'react';
import {
  getRoom,
  getStories,
  getActiveStory,
  changeActiveStory,
  updateParticipant,
  addVote,
} from '../services';
import * as configurator from 'configurator/configurator';

import './Room.scss';

import User from '../components/User/User';
import StoryList from '../components/StoryList/StoryList.tsx';
import VoteMachine from '../components/VoteMachine/VoteMachine';
import Stats from '../components/Stats/Stats';
import Players from '../components/Players/Players.tsx';


export default class Room extends Component {
  config = configurator.config;

  constructor(props) {
    super(props);
    const { match, io, user } = props;
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
        votes: [],
        rallyStory: {
          id: null,
        },
      },
      user,
    };
    this.createSocketSubscriptions(io);
    this.handleChangeActiveStory = this.handleChangeActiveStory.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleUserToggle = this.handleUserToggle.bind(this);
  }

  createSocketSubscriptions(io) {
    io.socket.on('room', async (msg) => {
      const room = await getRoom(this.state.room.id);
      this.setState({ room });

      if (msg.verb === 'updated') {
        if (msg.data.activeStory) {
          const activeStoryId = msg.data.activeStory;
          const activeStory = await getActiveStory(activeStoryId);
          this.setState({ activeStory });
        }
      }
    });

    io.socket.on('vote', async (msg) => {
      if (msg.verb === 'created') {
        const activeStory = Object.assign(this.state.activeStory, {});
        activeStory.votes.push(msg.data.value);
        this.setState({ activeStory });
      }
    });
  }

  async componentDidMount() {
    const haveRoom = getRoom(this.state.match.params.roomId);
    const haveStories = getStories();

    const room = await haveRoom;
    const stories = await haveStories;

    let activeStory = this.state.activeStory;
    if (room.activeStory) {
      activeStory = await getActiveStory(room.activeStory.id);
    }

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
    await addVote(vote, this.state.activeStory)
    const activeStory = await getActiveStory(this.state.activeStory.id);
    this.setState({
      activeStory,
    });
  }

  async handleUserToggle() {
    const room = Object.assign(this.state.room, {});
    const index = this.state.room.participations.findIndex(participant => participant.idsid === this.state.user.idsid);
    if (index >= 0) {
      room.participations[index].watcher = !room.participations[index].watcher;
      this.setState({
        room,
      });
      await updateParticipant(room.id, room.participations[index]);
    }
  }

  getUserRole(user) {
    let userRole;
    const userParticipation = this.state.room.participations.find(participant => participant.idsid === user.idsid);
    if (userParticipation) {
      if (userParticipation.watcher) {
        userRole = 'watcher';
      } else {
        userRole = 'player';
      }
    }
    return userRole;
  }

  getUserParticipation(user) {
    const participation = this.state.room.participations.find(participation => participation.idsid === user.idsid);
    return participation;
  }

  render() {
    const {
      stories,
      room,
      activeStory,
      user,
    } = this.state;


    return (
      <div className="Room">
        <div className="header">
          <h1>{room.name || room.id || 'No Room'}</h1>
          <User user={user} onToggle={this.handleUserToggle} role={this.getUserRole(user)} />
        </div>
        <p className="lead">
          Everything is a
          <span className="blink">&nbsp;WIP</span>.
            Look and Feel will dramatically change. Just providing a visual grouping of components to aid in dev work.
        </p>
        <div className="poker-bits">
          <StoryList stories={stories}
            changeActiveStory={this.handleChangeActiveStory}
            activeStory={activeStory}
          />
          <VoteMachine activeStory={activeStory}
            handleVote={this.handleVote}
            role={this.getUserRole(user)}
            participation={this.getUserParticipation(user)}
          />
          <Stats activeStory={activeStory} />
          <Players participants={room.participations.filter(participant => !participant.watcher)}
            type="participants" 
            votes={activeStory.votes} />
          <Players participants={room.participations.filter(participant => participant.watcher)}
            type="watchers" />
        </div>
      </div>
    );
  }
}

