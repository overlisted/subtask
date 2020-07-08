import React from 'react';
import './App.css';
import {Switcher} from './UILib'

class Task {
  name;
  extraInfo;
  dateCreated = new Date();
  expireDate = null;
  dateClosed

  constructor(name, extraInfo, expireDate) {
    this.name = name;
    this.extraInfo = extraInfo;
    if(expireDate) this.expireDate = expireDate;

    this.open();
  }

  close() {
    this.dateClosed = new Date();
  }

  open() {
    this.dateClosed = null;
  }

  get completionTook() {
    return this.dateClosed ? new Date(this.dateClosed - this.dateCreated) : null;
  }
}

class TaskEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, props.task);
    console.log(this.state)
  }

  onFieldInput = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  exit = () => {
    this.props.exit(this.state);
  }

  render() {
    return (
      <div onKeyDown={e => e.key === "Escape" && this.exit(e)}>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.onFieldInput}
        />

        <div-place class="task-details">
          <textarea name="extraInfo" value={this.state.extraInfo} onChange={this.onFieldInput}/>
          <span className="not-important">Created at: {this.state.dateCreated.toDateString()}</span>
          <span className="not-important">
            Expiring at: {this.state.expireDate ? this.state.expireDate.toDateString() : "Never"}
          </span>
          <span className="not-important">
            Closed at: {this.state.dateClosed ? this.state.dateClosed.toDateString() : "Not yet"}
          </span>
          <span className="clickable" style={{fontStyle: "italic"}} onClick={this.exit}>Quit editor</span>
        </div-place>
      </div>
    );
  }
}

function ButtonCloseTask(props) {
  return <span
    className="clickable"
    style={{textAlign: "right", fontStyle: "italic"}}
    onClick={props.closeOrOpenTask}
  >{props.task.dateClosed ? "Reopen" : "Close now"}</span>
}

class TaskDetailsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isEditing: false}
  }

  editorExit = task => {
    this.setState({isEditing: false});
    this.props.editorExit(task);
  }

  render() {
    if(this.state.isEditing) return <TaskEditor task={this.props.task} exit={this.editorExit}/>

    console.log(this.props)

    return (
      <div>
        <span-title class={this.props.task.dateClosed ? "line-through" : ""}>{this.props.task.name}</span-title>
        <div-place class="task-details">
          <span>{this.props.task.extraInfo}</span>
          <span className="not-important">Created at: {this.props.task.dateCreated.toDateString()}</span>
          <span className="not-important">
            Expiring at: {this.props.task.expireDate ? this.props.task.expireDate.toDateString() : "Never"}
          </span>
          <span className="not-important">
            Closed at: {this.props.task.dateClosed ? this.props.task.dateClosed.toDateString() : "Not yet"}
            <ButtonCloseTask closeOrOpenTask={this.props.closeOrOpenTask} task={this.props.task}/>
          </span>
          <span
            className="clickable"
            style={{fontStyle: "italic"}}
            onClick={() => this.setState({isEditing: true})}
          >
            Edit
          </span>
        </div-place>
      </div>
    );
  }
}

function SwitcherColumn(props) {
  return (
    <div className="switcher-column">
      <div-place>
        <div className="button suggested-action" onClick={props.addTask}>Add task</div>
      </div-place>
      <Switcher
        className="list-tasks-group"
        options={props.tasks.map(it => {
          return {element: it.name, className: it.dateClosed ? "line-through" : ""}
        })}
        activate={props.activate}
        getActive={props.getActive}
      />
    </div>
  )
}

class App extends React.Component {
  state = {
    tasks: [
      new Task("Please add new tasks", "You can do that by clicking the button above the tasks list")
    ],
    selectedTaskIndex: 0
  }

  addTask = () => {
    this.setState({tasks: [...this.state.tasks, new Task("New task", "With a description")]})
  }

  closeOrOpenCurrentTask = () => {
    const task = this.state.tasks.slice()[this.state.selectedTaskIndex];
    if(task.dateClosed) {
      task.open();
    } else {
      task.close();
    }

    this.saveCurrentTask(task);
  }

  saveCurrentTask = task => {
    const array = this.state.tasks.slice();
    array[this.state.selectedTaskIndex] = task;
    this.setState({tasks: array});
  }
  
  render() {
    return (
      <>
        <TaskDetailsView
          task={this.state.tasks[this.state.selectedTaskIndex]}
          closeOrOpenTask={this.closeOrOpenCurrentTask}
          editorExit={this.saveCurrentTask}
        />
        <SwitcherColumn
          addTask={this.addTask}
          tasks={this.state.tasks}
          activate={index => this.setState({selectedTaskIndex: index})}
          getActive={() => this.state.selectedTaskIndex}
        />
      </>
    )
  }
}

export default App;
