import React from 'react';
import './Players.scss';
 
const Players = ({ players }) => {
  return (
    <div className="players">
      <h2>Players</h2>
      <ul>
        {players.map((player, i) => <li key={i}>{player.name}</li>)}
      </ul>
    </div>
  )
};

export default Players;