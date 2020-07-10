import {observer} from "mobx-react";
import React from "react";
import {GroupTask, Task} from "./task";
import {observable} from "mobx";
import classNames from "classnames";
import {Field} from "./UILib/editable";
import {TaskListColumn} from "./taskView";

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

interface TaskDetailsProps<T extends Task<any>> {
  task: T;
}

@observer
class StringTaskDetails extends React.Component<TaskDetailsProps<Task<string>>> {
  @observable isEditing: boolean = false;

  render() {
    const {task} = this.props;

    return (
      <>
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
      </>
    );
  }
}

@observer
class GroupTaskDetails extends React.Component<TaskDetailsProps<GroupTask>> {
  render() {
    const {task} = this.props

    return (
      <>
        <TaskListColumn group={task}/>
        <TaskDetails selected={task.selected}/>
      </>
    );
  }
}

@observer
export class TaskDetails extends React.Component<{selected: Task<any> | null}> {
  render() {
    const task = this.props.selected;

    if(!task) {
      return (
        <>
          <div className="title"><span className="title">Select a task</span></div>
          <div className="place task-details"/>
        </>
      );
    }

    if(task instanceof GroupTask) return <GroupTaskDetails task={task}/>

    return <StringTaskDetails task={task}/>;
  }
}