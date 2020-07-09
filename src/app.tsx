import React from 'react';
import './app.css';
import {Switcher, SwitcherOptionData, SwitcherOptionProps, SwitcherStore} from './UILib/switcher'
import {observer} from "mobx-react"
import {observable} from "mobx";
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

    this.open();
  }

  close() {
    this.dateClosed = new Date();
  }

  open() {
    this.dateClosed = null;
  }

  get completionTook() {
    return this.dateClosed ? this.dateClosed.getTime() - this.dateCreated.getTime() : null;
  }
}

interface TaskListElementProps extends SwitcherOptionProps {
  name: string;
  dateClosed: Date;
}

@observer
class TaskListElement extends React.Component<TaskListElementProps> {
  render() {
    return (
      <div
        className={classNames({
          "button": true,
          "active": this.props.isActive(),
          "crossed-out": this.props.dateClosed
        })}
        onClick={this.props.activate}
      >
        {this.props.name}
      </div>
    );
  }
}

class TaskStore implements SwitcherStore {
  @observable optionsData: Task[] = [new Task("name", "desc"), new Task("another", "another desc")];

  @observable activeOption = null;
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
    )

    return (
      <div>
        <span className="title"></span>
        <div className="place task-details">

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
        <TaskDetails selected={this.tasks.activeOption}/>
        <div className="place">
          <Switcher Component={TaskListElement} store={this.tasks}/>
        </div>
      </>
    )
  }
}

export default App;
