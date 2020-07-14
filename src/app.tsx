import React from "react";
import "./UILib/defaults.css";
import "./app.css";
import {observer} from "mobx-react";
import {GroupTask} from "./task";
import {observable} from "mobx";
import AnyTaskView from "./taskView";
import {SyncTrunk} from "mobx-sync";

@observer
class App extends React.Component {
  @observable mainGroup: GroupTask;
  trunk: SyncTrunk;

  constructor(props: {}) {
    super(props);

    this.mainGroup = new GroupTask("\0Local tasks", []);
    this.trunk = new SyncTrunk(this.mainGroup, {storage: window.localStorage, onError: console.error});

    this.trunk.init();
  }

  render() {
    return (
      <AnyTaskView task={this.mainGroup}/>
    );
  }
}

export default App;
