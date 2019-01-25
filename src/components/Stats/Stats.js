import React from 'react';
import './Stats.scss';

import Timer from '../Timer/Timer.tsx';
 
export default ({ activeStory }) => {
  const { votes, id } = activeStory;
  let average = 0;
  
  const hasQuestions = votes.find(vote => vote.value === '?');
  if (hasQuestions) {
    average = '?';
  } else {
    const sum = votes.reduce((acc, n) => acc + Number(n.value), 0);
    average = sum/votes.length;
    average = average.toFixed(2);
  }

  return (
    <div className="stats">
      <h2>Stats</h2>
      <dl>
        <Timer label="time taken:" activeStoryId={id}/>
        <dt>vote average:</dt>
        <dd>{average === 'NaN' ? 0 : average}</dd>
      </dl>
    </div>
  )
};
