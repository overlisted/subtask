import React from "react";
import classNames from "classnames";
import "./revealer.css"

export default class Revealer extends React.Component<{title: string}, {isOpen: boolean}> {
  state = {
    isOpen: false
  }

  render() {
    const {isOpen} = this.state;

    return (
      <div className="revealer">
        <span
          className={classNames({"header": true, "clickable": true, "active": isOpen})}
          onClick={() => this.setState({isOpen: !isOpen})}
        >
          {this.props.title}
        </span>
        <div className={classNames({"content": true, "no-display": !isOpen})}>{this.props.children}</div>
      </div>
    )
  }
}