import React from "react";
import {GroupTask, Task} from "./task";
import Revealer from "./UILib/revealer";
import {observer} from "mobx-react";

@observer
class GroupTaskView extends React.Component<{task: GroupTask}> {
  render() {
    return this.props.task.content.map(it => <AnyTaskView task={it} key={it.dateCreated.getTime()}/>);
  }
}

@observer
class StringTaskView extends React.Component<{task: Task<string>}> {
  render() {
    return <div>
      <span>task</span>
    </div>;
  }
}

@observer
export default class AnyTaskView extends React.Component<{task: Task<any>}> {
  render() {
    const {task} = this.props;

    if(task instanceof GroupTask) return <Revealer title={task.name}><GroupTaskView task={task}/></Revealer>;
    if(typeof task.content === "string") return <Revealer title={task.name}><StringTaskView task={task}/></Revealer>;
  }
}