import React from "react";
import classNames from "classnames";
import {observer} from "mobx-react";

interface ButtonProps {
  onClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

@observer
export default class Button extends React.Component<ButtonProps, {isActive: boolean}> {
  state = {
    isActive: false
  }

  render() {
    return (
      <span
        className={classNames({"button": true, "active": this.state.isActive})}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </span>
    );
  }
}