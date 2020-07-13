import React from "react";
import {GroupTask, Task} from "./task";
import {observer} from "mobx-react";
import Button from "./UILib/button";
import StringTaskView from "./stringTaskView";
import Revealer from "./UILib/revealer";
import {Field} from "./UILib/editable";
import {observable} from "mobx";

@observer
class GroupTaskView extends React.Component<{task: GroupTask}> {
  render() {
    const {content} = this.props.task;

    return <>
      <div className="group-actions">
        <Button onClick={() => content.push(new Task("A task", ""))}>New task</Button>
        <Button onClick={() => content.push(new GroupTask("A group", []))}>New group</Button>
      </div>

      {content.map(it => <AnyTaskView task={it} key={it.dateCreated}/>)}
    </>
  }
}

@observer
export default class AnyTaskView extends React.Component<{task: Task<any>}> {
  render() {
    const {task} = this.props;

    if(Array.isArray(task.content)) {
      return <Revealer title={<TaskRevealerTitle task={task}/>}><GroupTaskView task={task}/></Revealer>
    }

    if(typeof task.content === "string") {
      return <Revealer title={<TaskRevealerTitle task={task}/>}><StringTaskView task={task}/></Revealer>;
    }
  }
}

@observer
class TaskRevealerTitle extends React.Component<{task: Task<any>}> {
  @observable isRenaming = false;

  render() {
    const {task} = this.props;

    return <div className="task-revealer-title">
      {
        this.isRenaming
          ? <Field value={task.name} setValue={name => task.name = name}/>
          : <span>{task.name}</span>
      }
      <span
        onClick={() => task.isOpen = !task.isOpen}
        className="clickable not-important"
      >
        {task.isOpen ? "Close" : "Reopen"}
      </span>
      <span
        onClick={() => this.isRenaming = !this.isRenaming}
        className="clickable not-important"
      >
        {this.isRenaming ? "Escape" : "Rename"}
      </span>
    </div>;
  }
}