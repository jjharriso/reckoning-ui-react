import React from 'react';
import ContentEditable from 'react-contenteditable';
import MenuButton from '../MenuButton/MenuButton';

import './VoteMachine.scss';

const VoteMachine = (props) => {
  const { activeStory, handleVote, updateStory } = props;
  const voteOptions = ['1', '2', '3', '5', '8', '13', '?'];

  return (
    <div className="vote-machine">
      <div className="voting">
        { voteOptions.map((option, i) => <button className="btn btn-lg" onClick={() => handleVote(option)} key={i}>{option}</button>)}
      </div>

      <div className="story-name">
        <input className="form-control" type="text" value={activeStory.name || ''} onChange={() => { }} />
      </div>

      <MenuButton iconClass="intelicon-bold-solid" cmd="bold" />
      <MenuButton iconClass="intelicon-italics-solid" cmd="italic" />
      <MenuButton iconClass="intelicon-underline-solid" cmd="underline" />
      <MenuButton iconClass="intelicon-bullets-list-view" cmd="insertUnorderedList" />
      <MenuButton iconClass="intelicon-numbered-list" cmd="insertOrderedList" />
      <MenuButton iconClass="intelicon-undo" cmd="undo" />
      <MenuButton iconClass="intelicon-redo-repeat" cmd="redo" />

      <ContentEditable className="story-description" html={activeStory.description || ''} onInput={updateStory} onBlur={updateStory} />
    </div>
  )
};



export default VoteMachine;