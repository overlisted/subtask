import React from "react";
import "./app.css";
import {observer} from "mobx-react";
import {GroupTask, Task} from "./task";
import {computed, observable} from "mobx";
import {AllTasksActions, TaskDetails, TaskListColumns} from "./taskDetails";

@observer
class App extends React.Component {
  @observable mainGroup: GroupTask = new GroupTask("\0global", [], null);

  @computed get groupsHierarchy() {
    const result: GroupTask[] = [this.mainGroup];
    let selected: Task<any> | null = this.mainGroup;

    while(selected instanceof GroupTask) {
      selected = selected.selected;
      if(selected instanceof GroupTask) result.push(selected);
    }

    return result;
  }

  render() {
    return (
      <>
        <AllTasksActions groups={this.groupsHierarchy}/>
        <TaskListColumns groups={this.groupsHierarchy}/>
        <TaskDetails selected={this.mainGroup}/>
      </>
    );
  }
}

export default App;
