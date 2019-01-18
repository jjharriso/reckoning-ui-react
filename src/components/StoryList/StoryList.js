import React from 'react';
import sanitizeHtml from 'sanitize-html';

import './StoryList.scss';

const StoryList = ({ stories, changeActiveStory, activeStory }) => {
  const cleanItUp = (description) => {
    return sanitizeHtml(description, {allowedTags: [], allowedAttributes: {}});
  };
  const isActiveStory = (story) => {
    if (story.id === activeStory.rallyStory.id) {
      return 'active';
    }
  };

  return (
    <div className="story-list">
      <div>
        <h2>Select a Story</h2>
      </div>
      <div className="stories">
        <ul>
          {stories.map((story, i) => <li role="button" className={`${isActiveStory(story) || ''}`} title={cleanItUp(story.description)} onClick={() => changeActiveStory(story)} key={story.id}>{story.name}</li>)}
        </ul>
      </div>
    </div>
  )
};

export default StoryList;