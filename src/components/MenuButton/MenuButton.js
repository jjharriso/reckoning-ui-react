import React, { Component } from 'react';
import './MenuButton.scss';

class MenuButton extends Component {

  constructor(props) {
    const { cmd, arg, iconClass, label } = props;
    super(props);
    this.state = {
      cmd,
      arg,
      iconClass,
      label,
      active: false,
    };
  }

  toggleActive() {
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  render() {
    return (
      <button
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

export default MenuButton;