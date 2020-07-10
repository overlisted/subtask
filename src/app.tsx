import React from 'react';
import './app.css';
import {Switcher, SwitcherOptionData, SwitcherOptionProps} from './UILib/switcher'
import {observer} from "mobx-react"
import {computed, observable} from "mobx";
import classNames from "classnames";

type TaskDate = Date | null;
class Task implements SwitcherOptionData {
  @observable name: string;
  description: string;
  dateCreated: Date = new Date();
  expireDate: TaskDate;
  @observable dateClosed: TaskDate = null

  constructor(name: string, description: string = "", expireDate: TaskDate = null) {
    this.name = name;
    this.description = description;
    this.expireDate = expireDate;

    this.isOpen = true;
  }

  @computed get isOpen() {
    return this.dateClosed === null;
  }

  @computed get hasExpired() {
    return !!this.expireDate;
  }

  @computed get completionTook() {
    return this.dateClosed ? this.dateClosed.getTime() - this.dateCreated.getTime() : null;
  }

  set isOpen(is: boolean) {
    this.dateClosed = is ? null : new Date();
  }
}

@observer
class TaskListElement extends React.Component<SwitcherOptionProps<Task>> {
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

class TaskStore {
  @observable tasks: Task[] = [new Task("name", "desc"), new Task("another", "another desc")];
  @observable selected: Task | null = null;
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
class TaskDetails extends React.Component<{selected: Task | null}> {
  render() {
    const task = this.props.selected;

    if(!task) return (
      <div>
        <span className="title">Select a task</span>
        <div className="place task-details"/>
      </div>
    );

    return (
      <div>
        <span className={classNames({"title": true, "crossed-out": !task.isOpen})}>{task.name}</span>
        <div className="place task-details">
          <span>{task.description}</span>
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

@observer
class App extends React.Component {
  tasks = new TaskStore();

  render() {
    return (
      <>
        <TaskDetails selected={this.tasks.selected}/>
        <div className="place">
          <Switcher
            Component={TaskListElement}
            optionsData={this.tasks.tasks}
            activeOption={this.tasks.selected}
            setActiveOption={value => {
              this.tasks.selected = value
            }}
          />
        </div>
      </>
    )
  }
}

export default App;
