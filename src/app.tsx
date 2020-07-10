import React from "react";
import "./app.css";
import {observer} from "mobx-react";
import {GroupTask} from "./task";
import {observable} from "mobx";
import {TaskDetails} from "./taskDetails";

@observer
class App extends React.Component {
  @observable mainGroup: GroupTask = new GroupTask("\0global", [], null);

  render() {
    return (
      <>
        <TaskDetails selected={this.mainGroup}/>
      </>
    );
  }
}

export default App;
