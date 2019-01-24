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
        { stories.length > 0 ?
          <FilteredList stories={stories} changeActiveStory={changeActiveStory} activeStory={activeStory}/>
          :
          <span>Loading...</span>
        }
      </div>
    </div>
  )
};

export default StoryList;