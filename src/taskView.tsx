import React from "react";
import {GroupTask, Task} from "./task";
import Revealer from "./UILib/revealer";
import {observer} from "mobx-react";
import Button from "./UILib/button";
import StringTaskView from "./stringTaskView";

@observer
class GroupTaskView extends React.Component<{task: GroupTask}> {
  render() {
    const {content} = this.props.task;

    return <>
      <Button onClick={() => content.push(new Task("A task", ""))}>New task</Button>
      <Button onClick={() => content.push(new GroupTask("A group", []))}>New group</Button>

      {content.map(it => <AnyTaskView task={it} key={it.dateCreated.getTime()}/>)}
    </>
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