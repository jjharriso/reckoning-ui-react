import React from 'react';
import Player from './Player.model';
import Vote from './Vote.model';
type Props = {
  participants: Player[]
  type: string
  votes: Vote[]
}
import './Players.scss';

 
export default ({ participants, type, votes }: Props) => {
  const title = type.replace(/^\w/, c => c.toUpperCase());

  const getVote = (participant: Player) => {
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
