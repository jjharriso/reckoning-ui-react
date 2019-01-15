import React from 'react';
import './Stats.scss';
 
const Stats = ({ votes = [] }) => {
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
      <ul>
        <li>time taken:</li>
        <li>vote average: {average === 'NaN' ? 0 : average}</li>
      </ul>
    </div>
  )
};

export default Stats;