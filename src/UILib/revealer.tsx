import React from "react";
import classNames from "classnames";
import "./revealer.css"
import {observer} from "mobx-react";

@observer
export default class Revealer extends React.Component<{title: React.ReactNode}, {isOpen: boolean}> {
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