import React from 'react';
 
const Player = ({name, wwid}) => {
  return (
    <div className="player">
      <li>{name}</li>
    </div>
  )
};

export default Player;