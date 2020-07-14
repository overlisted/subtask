import React, {MouseEventHandler} from "react";
import {GroupTask, StringTask, Task} from "./task";
import {observer} from "mobx-react";
import Button from "./UILib/button";
import StringTaskView from "./stringTaskView";
import Revealer from "./UILib/revealer";
import {Field} from "./UILib/editable";
import {observable} from "mobx";
import CopyToClipboard from 'react-copy-to-clipboard';

@observer
class GroupTaskView extends React.Component<{task: GroupTask}> {
  render() {
    const {content} = this.props.task;

    return <>
      <div className="group-actions">
        <Button onClick={() => content.push(new StringTask("A task"))}>New task</Button>
        <Button onClick={() => content.push(new GroupTask("A group"))}>New group</Button>
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

class TitleButton extends React.Component<{onClick?: MouseEventHandler<HTMLElement>}> {
  render() {
    return <span
      className="clickable not-important"
      onClick={this.props.onClick}
    >
      {this.props.children}
    </span>
  }
}

@observer
class TaskRevealerTitle extends React.Component<{task: Task<any>}> {
  @observable isRenaming = false;

  render() {
    const {task} = this.props;

    return <>
      {
        this.isRenaming
          ? <Field value={task.name} setValue={name => task.name = name}/>
          : <span className={task.isOpen ? "" : "crossed-out"}>{task.name}</span>
      }
      <TitleButton onClick={() => task.isOpen = !task.isOpen}>
        {task.isOpen ? "Close" : "Reopen"}
      </TitleButton>
      <TitleButton onClick={() => this.isRenaming = !this.isRenaming}>
        {this.isRenaming ? "Escape" : "Rename"}
      </TitleButton>
      <CopyToClipboard text={JSON.stringify(task, null, 2)}>
        <TitleButton>JSON to clipboard</TitleButton>
      </CopyToClipboard>
    </>;
  }
}