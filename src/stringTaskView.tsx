import React from "react";
import {StringTask} from "./task";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {Field} from "./UILib/editable";

@observer
export default class StringTaskView extends React.Component<{task: StringTask}> {
  @observable isEditingContent = false;

  render() {
    const {task} = this.props;

    return (
      <>
        <div>
          {
            this.isEditingContent
              ? <Field
                onHitEscape={() => this.isEditingContent = false}
                value={task.content}
                setValue={name => task.content = name}
              />
              : <span>{task.content}</span>
          }
          <span
            onClick={() => this.isEditingContent = !this.isEditingContent}
            className="clickable not-important"
          >
            Edit
          </span>
        </div>
        <span className="not-important">
          Created at: {new Date(task.dateCreated).toDateString()}
        </span>
        <span className="not-important">
          Expiring at: {task.hasExpired ? new Date(task.dateCreated).toDateString() : "Never"}
        </span>
        <span className="not-important">
          Closed at: {!task.isOpen ? new Date(task.dateCreated).toDateString() : "Not yet"}
        </span>
      </>
    );
  }
}