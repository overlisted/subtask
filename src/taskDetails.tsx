import {observer} from "mobx-react";
import React from "react";
import {GroupTask, Task} from "./task";
import {observable} from "mobx";
import classNames from "classnames";
import {Field} from "./UILib/editable";
import {TaskListActions, TaskListColumn} from "./taskView";

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

    if(task instanceof GroupTask) return <TaskDetails selected={task.selected}/>;

    return <StringTaskDetails task={task}/>;
  }
}

@observer
export class TaskListColumns extends React.Component<{groups: GroupTask[]}> {
  render() {
    const {groups} = this.props;

    return (
      <div className="task-lists" style={{gridTemplateAreas: `"${groups.map(() => ". ").join("")}"`}}>
        {groups.map(it => <TaskListColumn group={it} key={it.dateCreated.getTime()}/>)}
      </div>
    );
  }
}

export class AllTasksActions extends React.Component<{groups: GroupTask[]}> {
  render() {
    const {groups} = this.props;

    return (
      <div className="all-tasks-actions" style={{gridTemplateAreas: `"${groups.map(() => ". ").join("")}"`}}>
        {groups.map(it => <TaskListActions content={it.content} key={it.dateCreated.getTime()}/>)}
      </div>
    );
  }
}