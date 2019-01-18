import React from 'react';

import Toggle from 'react-toggle-component';
import 'react-toggle-component/styles.css';

import './User.scss';

const User = (props) => {
  const checked = props.role === 'watcher' ? false : true;

  return (
    <div className="user">
      <span>{props.user.idsid}</span>
      {props.role && 
        <Toggle className={`${checked ? 'player' : ''}`} checked={checked} label="watcher" labelRight="player" theme="square" onToggle={() => props.onToggle()}/>
      }
    </div>
  )
};

export default User;
