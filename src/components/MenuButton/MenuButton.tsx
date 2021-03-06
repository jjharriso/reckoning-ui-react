import React, { Component } from 'react';
import './MenuButton.scss';

type Props = {
  disabled: boolean
  cmd: string
  arg: string
  iconClass: string
  label: string
  active: boolean
}
type State = Readonly<Props>

export default class MenuButton extends Component<Props, State> {
  readonly state: State = { ...this.props }

  toggleActive() {
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  render() {
    return (
      <button
        disabled={this.props.disabled}
        className={`menu-button btn btn-sm ${this.state.active ? 'active' : ''}`}
        key={this.state.cmd}
        onClick={evt => {
          evt.preventDefault(); // Avoids losing focus from the editable area
          evt.stopPropagation();
          this.toggleActive();
          document.execCommand(this.state.cmd, false, this.state.arg); // Send the command to the browser
        }}
      >
        <i className={this.state.iconClass} aria-hidden="true" aria-label={this.state.cmd || this.state.label}></i>
      </button>
    );
  }
}
