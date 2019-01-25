import React from 'react';
import ContentEditable from 'react-contenteditable';
import MenuButton from '../MenuButton/MenuButton.tsx';

import './VoteMachine.scss';

export default (props) => {
  const { activeStory, handleVote, updateStory, role, participation } = props;
  const disabled = role === 'watcher' ? true : false;

  const voteOptions = ['1', '2', '3', '5', '8', '13', '?'];
  
  const userVote = (voteOption) => {
    if (!disabled) {
      const foundVote = activeStory.votes.find(vote => vote.participation === participation.id);
      const userVoted = foundVote && (foundVote.value === voteOption);
      return userVoted ? 'active' : '';
    }
  };


  return (
    <div className="vote-machine">
      <div className="voting">
        {voteOptions.map((voteOption, i) => <button className={`btn btn-lg ${userVote(voteOption)}`} disabled={disabled || !activeStory.id} onClick={() => handleVote(voteOption)} key={i}>{voteOption}</button>)}
      </div>

      <div className="form-group">
        <div className="story-name">
          <label htmlFor="story-name">{(activeStory.rallyStory && activeStory.rallyStory.formattedID) || 'User Story ID'}</label>
          <input id="story-name" disabled={!activeStory.id} className="form-control" type="text" value={activeStory.name || ''} onChange={() => { }} />
        </div>
        <div className="story-estimate">
          <label htmlFor="story-estimate">estimate</label>
          <input id="story-estimate" disabled={!activeStory.id} className="form-control" type="text" value={(activeStory.rallyStory && activeStory.rallyStory.estimate) || ''} onChange={() => { }} />
        </div>
      </div>

      <MenuButton disabled={!activeStory.id} iconClass="intelicon-bold-solid" cmd="bold" />
      <MenuButton disabled={!activeStory.id} iconClass="intelicon-italics-solid" cmd="italic" />
      <MenuButton disabled={!activeStory.id} iconClass="intelicon-underline-solid" cmd="underline" />
      <MenuButton disabled={!activeStory.id} iconClass="intelicon-bullets-list-view" cmd="insertUnorderedList" />
      <MenuButton disabled={!activeStory.id} iconClass="intelicon-numbered-list" cmd="insertOrderedList" />
      <MenuButton disabled={!activeStory.id} iconClass="intelicon-undo" cmd="undo" />
      <MenuButton disabled={!activeStory.id} iconClass="intelicon-redo-repeat" cmd="redo" />

      <ContentEditable disabled={!activeStory.id} className="story-description" html={activeStory.description || ''} onInput={updateStory} onBlur={updateStory} />
    </div>
  )
};

