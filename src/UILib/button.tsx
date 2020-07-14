import React from "react";
import {observer} from "mobx-react";

interface ButtonProps {
  onClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

@observer
export default class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <span
        className="button"
        onClick={this.props.onClick}
      >
        {this.props.children}
      </span>
    );
  }
}