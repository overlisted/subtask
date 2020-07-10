import React from "react";
import "./app.css";
import {observer} from "mobx-react";
import {TaskList} from "./task";
import {TaskDetails, TaskListColumn} from "./taskView";
import {observable} from "mobx";

@observer
class App extends React.Component {
  @observable tasksLists: TaskList<any>[] = [new TaskList()];

  render() {
    return (
      <>
        <TaskListColumn list={this.tasksLists[0]}/>
        <TaskDetails selected={this.tasksLists[this.tasksLists.length - 1].selected}/>
      </>
    );
  }
}

export default App;
