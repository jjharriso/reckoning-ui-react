import React from 'react';
import './Players.scss';
 
const Players = ({ participants, type, votes }) => {
  const title = type.replace(/^\w/, c => c.toUpperCase());
  console.log(votes);

  const getVote = (participant) => {
    const foundVote = votes.find(vote => vote.participation === participant.id);
    return (foundVote && ` (${foundVote.value})`) || '';
  };

  return (
    <div className={type}>
      <h2>{title}</h2>
      <ul>
        {participants.map((participant, i) => 
          <li key={i}>
            {participant.idsid}
            {!participant.watcher &&
              <span>{getVote(participant)}</span>
            }
          </li>)}
      </ul>
    </div>
  )
};

export default Players;