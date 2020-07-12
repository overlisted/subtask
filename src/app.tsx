import React from "react";
import "./UILib/defaults.css"
import "./app.css";
import {observer} from "mobx-react";
import {GroupTask} from "./task";
import {observable} from "mobx";
import Revealer from "./UILib/revealer";

@observer
class App extends React.Component {
  @observable mainGroup: GroupTask = new GroupTask("\0global", [], null);

  render() {
    return (
      <>
        <Revealer title="test">
          <Revealer title="test">
            <span>1</span>
          </Revealer>
          <Revealer title="test">
            <span>2</span>
          </Revealer>
          <Revealer title="test">
            <span>3</span>
          </Revealer>
        </Revealer>
      </>
    );
  }
}

export default App;
