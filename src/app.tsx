import React from "react";
import "./UILib/defaults.css";
import "./app.css";
import {observer} from "mobx-react";
import {GroupTask} from "./task";
import {observable} from "mobx";
import AnyTaskView from "./taskView";

@observer
class App extends React.Component {
  @observable mainGroup: GroupTask = new GroupTask("\0global", [], null);

  render() {
    return (
      <>
        <AnyTaskView task={this.mainGroup}/>
      </>
    );
  }
}

export default App;
