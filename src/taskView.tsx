import {observer} from "mobx-react";
import React from "react";
import {Switcher, SwitcherOptionProps} from "./UILib/switcher";
import classNames from "classnames";
import {GroupTask, Task} from "./task";
import {observable} from "mobx";

export class TaskListActions extends React.Component<{content: Task<any>[]}> {
  render() {
    const {content} = this.props;

    return (
      <div className="place task-list-actions">
          <span
            className="button suggested-action"
            onClick={() => content.push(new Task("A task", ""))}
          >
            New task
          </span>
        <span
          className="button"
          onClick={() => {content.push(new GroupTask("A group", []))}}
        >
            New group
          </span>
      </div>
    );
  }
}

@observer
export class TaskListColumn extends React.Component<{group: GroupTask}> {
  render() {
    let {group} = this.props;

    return (
      <div className="place task-list">
        <Switcher
          Component={TaskListElement}
          optionsData={group.content}
          activeOption={group.selected}
          setActiveOption={value => {
            group.selected = value;
          }}
        />
      </div>
    );
  }
}

@observer
export class TaskListElement extends React.Component<SwitcherOptionProps<Task<any>>> {
  @observable isRenaming = false;

  render() {
    const {element} = this.props;

    return (
      <div
        className={classNames({
          "button": true,
          "task-list-element": true,
          "active": this.props.isActive(),
          "crossed-out": !element.isOpen
        })}
        key={element.dateCreated.getTime()}
        onClick={this.props.activate}
      >
        {element.name}
        <span
          className="clickable not-important rename"
          onClick={() => this.isRenaming = !this.isRenaming}
        >
          {this.isRenaming ? "finish" : "rename"}
        </span>
      </div>
    );
  }
}