import React from "react";
import "./app.css";
import {observer} from "mobx-react";
import {GroupTask} from "./task";
import {TaskDetails, TaskListColumn} from "./taskView";
import {observable} from "mobx";

@observer
class App extends React.Component {
  @observable mainGroup: GroupTask = new GroupTask("\0global", [], null);

  render() {
    return (
      <>
        <TaskListColumn group={this.mainGroup}/>
        <TaskDetails selected={this.mainGroup.selected}/>
      </>
    );
  }
}

export default App;
