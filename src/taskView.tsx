import {observer} from "mobx-react";
import React from "react";
import {Switcher, SwitcherOptionProps} from "./UILib/switcher";
import classNames from "classnames";
import {Task, TaskList} from "./task";
import {observable} from "mobx";
import {Field} from "./UILib/editable";

@observer
export class TaskListColumn extends React.Component<{list: TaskList<any>}> {
  render() {
    let {list} = this.props;

    return (
      <div>
        <div className="place">
          <span
            className="button suggested-action"
            onClick={() => list.tasks.push(new Task("A task", ""))}
          >
            New task
          </span>
          <span
            className="button"
            onClick={() => {list.tasks.push(new Task<Task<any>[]>("A task", []))}}
          >
            New group
          </span>
        </div>
        <div className="place">
          <Switcher
            Component={TaskListElement}
            optionsData={list.tasks}
            activeOption={list.selected}
            setActiveOption={value => {
              list.selected = value;
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

@observer
class TaskCloseButton extends React.Component<{readonly isOpen: boolean, toggle(): void}> {
  render() {
    return (
      <span className="clickable" onClick={this.props.toggle}>
        {this.props.isOpen ? "Close" : "Open"} now
      </span>
    );
  }
}

@observer
export class TaskDetails extends React.Component<{selected: Task<string> | null}> {
  @observable isEditing: boolean = false;

  render() {
    const task = this.props.selected;

    if(!task) {
      return (
        <div>
          <div className="title"><span className="title">Select a task</span></div>
          <div className="place task-details"/>
        </div>
      );
    }

    return (
      <div>
        <div className="title">
          <span className={classNames({"title": true, "crossed-out": !task.isOpen})}>
            {
              this.isEditing
                ? <Field value={task.name} setValue={value => task.name = value}/>
                : task.name
            }
          </span>
          <span
            className="clickable not-important switch-edit"
            onClick={() => this.isEditing = !this.isEditing}
          >
            {this.isEditing ? "Finish" : "Edit"}
          </span>
        </div>
        <div className="place task-details">
          <span>
            {
              this.isEditing
                ? <Field isTextarea={true} value={task.content} setValue={value => task.content = value}/>
                : task.content
            }
          </span>
          <span className="not-important">
            Created at: {task.dateCreated.toDateString()}
          </span>
          <span className="not-important">
            Expiring at: {task.hasExpired ? task.expireDate?.toDateString() : "Never"}
          </span>
          <span className="not-important">
            Closed at: {!task.isOpen ? task.dateClosed?.toDateString() : "Not yet"}
            <TaskCloseButton isOpen={task.isOpen} toggle={() => task.isOpen = !task.isOpen}/>
          </span>
        </div>
      </div>
    );
  }
}