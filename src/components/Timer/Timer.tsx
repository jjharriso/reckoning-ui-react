import React, { Component } from 'react';
import moment from 'moment';

type Props = {
  activeStoryId: string
  label: string
  currentTime: any
}
type State = Readonly<Props>

export default class Timer extends Component<Props, State> {
  interval: any = null;
  readonly state: State = { 
    ...this.props,
    currentTime: moment(0),    
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.setState((prevState: State) => ({
        currentTime: prevState.currentTime.add(1, 'second'),
      }));
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }

  componentDidUpdate(prevProps: Props) {
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
