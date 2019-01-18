import React from 'react';
import './Players.scss';
 
const Players = ({ participants, type }) => {
  const title = type.replace(/^\w/, c => c.toUpperCase());

  return (
    <div className={type}>
      <h2>{title}</h2>
      <ul>
        {participants.map((participant, i) => <li key={i}>{participant.name} {participant.watcher}</li>)}
      </ul>
    </div>
  )
};

export default Players;