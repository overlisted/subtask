import {observer} from "mobx-react";
import React from "react";
import {Switcher, SwitcherOptionProps} from "./UILib/switcher";
import classNames from "classnames";
import {GroupTask, Task} from "./task";

@observer
export class TaskListColumn extends React.Component<{group: GroupTask}> {
  render() {
    let {group} = this.props;

    return (
      <div className="task-list">
        <div className="place task-list-actions">
          <span
            className="button suggested-action"
            onClick={() => group.content.push(new Task("A task", ""))}
          >
            New task
          </span>
          <span
            className="button"
            onClick={() => {group.content.push(new GroupTask("A group", []))}}
          >
            New group
          </span>
        </div>
        <div className="place">
          <Switcher
            Component={TaskListElement}
            optionsData={group.content}
            activeOption={group.selected}
            setActiveOption={value => {
              group.selected = value;
            }}
          />
        </div>
      </div>
    );
  }
}

@observer
export class TaskListElement extends React.Component<SwitcherOptionProps<Task<any>>> {
  render() {
    const {element} = this.props;

    return (
      <div
        className={classNames({
          "button": true,
          "active": this.props.isActive(),
          "crossed-out": !element.isOpen
        })}
        key={element.dateCreated.getTime()}
        onClick={this.props.activate}
      >
        {element.name}
      </div>
    );
  }
}