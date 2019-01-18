import React, { Component } from 'react';
import moment from 'moment';

class Timer extends Component {
  interval;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: moment(0),
    };
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        currentTime: prevState.currentTime.add(1, 'second'),
      }));
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeStoryId && (prevProps.activeStoryId !== this.props.activeStoryId)) {
      this.stopTimer();
      this.setState({
        currentTime: moment(0),
      });
    }
    if (this.props.activeStoryId && !this.interval) {
      this.startTimer();
    }
  }

  render() {
    
    return (
      <>
        <dt>{this.props.label}</dt>
        <dd>{this.state.currentTime.format('mm:ss')}</dd>
      </>
    )
  }
}

export default Timer;