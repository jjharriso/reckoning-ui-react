import React from 'react';
import './VoteMachine.scss';
 
const VoteMachine = ({ activeStory }) => {
  return (
    <div className="vote-machine">
      <h2>{activeStory.name}</h2>
      <p>{activeStory.description}</p>
    </div>
  )
};

export default VoteMachine;