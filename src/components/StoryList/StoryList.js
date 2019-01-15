import React from 'react';
import sanitizeHtml from 'sanitize-html';

import './StoryList.scss';

const StoryList = ({ stories, changeActiveStory }) => {
  const cleanItUp = (description) => {
    return sanitizeHtml(description, {allowedTags: [], allowedAttributes: {}});
  }
  return (
    <div className="story-list">
      <div>
        <h2>Select a Story</h2>
      </div>
      <div className="stories">
        <ul>
          {stories.map((story, i) => <li role="button" title={cleanItUp(story.description)} onClick={() => changeActiveStory(story)} key={story.id}>{story.name}</li>)}
        </ul>
      </div>
    </div>
  )
};

export default StoryList;