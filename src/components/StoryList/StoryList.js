import React from 'react';

import './StoryList.scss';

import FilteredList from '../FilteredList/FilteredList';

const StoryList = ({ stories, changeActiveStory, activeStory }) => {
  
  return (
    <div className="story-list">
      <div>
        <h2>Select a Story</h2>
      </div>
      <div className="stories">
        <FilteredList stories={stories} changeActiveStory={changeActiveStory} activeStory={activeStory}/>
      </div>
    </div>
  )
};

export default StoryList;