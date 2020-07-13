import React from "react";
import {Task} from "./task";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Field} from "./UILib/editable";

@observer
export default class StringTaskView extends React.Component<{task: Task<string>}> {
  @observable isEditingContent = false;

  render() {
    const {task} = this.props;

    return (
      <>
        <div>
          {
            this.isEditingContent
              ? <Field value={task.content} setValue={name => task.content = name}/>
              : <span>{task.content}</span>
          }
          <span
            onClick={() => this.isEditingContent = !this.isEditingContent}
            className="clickable not-important"
          >
            {this.isEditingContent ? "Escape" : "Edit"}
          </span>
        </div>
        <span className="not-important">
          Created at: {task.dateCreated.toDateString()}
        </span>
        <span className="not-important">
          Expiring at: {task.hasExpired ? task.expireDate?.toDateString() : "Never"}
        </span>
        <span className="not-important">
          Closed at: {!task.isOpen ? task.dateClosed?.toDateString() : "Not yet"}
        </span>
      </>
    );
  }
}