import React from 'react';

const Story = (props) => {
  const { title, description } = props;
  return (
    <li className="story">{title}</li>
  );
}

export default Story;