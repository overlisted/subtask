import React from "react";
import "./app.css";
import {observer} from "mobx-react";
import {TaskStore} from "./task";
import {TaskDetails, TaskListElement} from "./taskView";
import {Switcher} from "./UILib/switcher";

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
              this.tasks.selected = value;
            }}
          />
        </div>
      </>
    );
  }
}

export default App;
