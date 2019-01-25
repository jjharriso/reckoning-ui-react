import React, { SFC } from 'react';
import Story from './Story.model';
type Props = {
  stories: Story[]
  changeActiveStory(story: Story): void
  activeStory: Story
}
import './StoryList.scss';

import FilteredList from '../FilteredList/FilteredList';

const StoryList: SFC<Props> = ({ stories, changeActiveStory, activeStory }) => {
  
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