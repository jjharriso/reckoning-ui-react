import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';

import './FilteredList.scss';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    const { stories, activeStory } = this.props;
    this.state = {
      filteredStories: stories,
      stories,
      activeStory,
      filterText: '',
    };
    this.handleFilterText = this.handleFilterText.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { activeStory, stories } = this.props;
    if (prevProps.activeStory && (prevProps.activeStory.id !== activeStory.id)) {
      this.setState({
        activeStory: activeStory,
      });
    }

    if (prevProps.stories && (prevProps.stories.length !== stories.length)) {
      this.setState({
        filteredStories: stories,
        stories,
      });
    }
  }

  handleFilterText(evt) {
    const { value: filterText } = evt.target;
    const { stories } = this.state;
    if (!filterText) {
      this.setState({
        filterText: '',
        filteredStories: stories,
      });
    } else {
      const filteredStories = stories.filter(story => story.name.toLowerCase().search(filterText.toLowerCase()) !== -1);
      this.setState({ 
        filterText,
        filteredStories,
      });
    }
  }

  cleanItUp(description) {
    return sanitizeHtml(description, {allowedTags: [], allowedAttributes: {}});
  };

  isActiveStory(story) {
    if (story.id === this.props.activeStory.rallyStory.id) {
      return 'active';
    }
  };


  render() {
    const {
      filteredStories,
      filterText,
    } = this.state;
    return (
      <div className="filtered-list">
        <input className="form-control" type="text" value={filterText} onChange={this.handleFilterText} placeholder="filter stories" />
        <ul>
          {filteredStories.map((story, i) => <li role="button" className={`${this.isActiveStory(story) || ''}`} title={this.cleanItUp(story.description)} onClick={() => this.props.changeActiveStory(story)} key={i}>{story.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default FilteredList;