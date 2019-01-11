import React from 'react';

import './StoryList.scss';

const StoryList = ({ stories }) => {
  const handleClick = () => {

  };

  return (
    <div className="story-list">
      <div>
        <h2>Select a Story</h2>
      </div>
      <div className="stories">
        <ul>
          {stories.map((story, i) => <li role="button" onClick={handleClick} key={i}>{story.name}</li>)}
        </ul>
      </div>
    </div>
  )
};

export default StoryList;