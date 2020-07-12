import React from "react";
import {Task} from "./task";

export default class StringTaskView extends React.Component<{task: Task<string>}> {
  render() {
    const {task} = this.props;

    return (
      <div className="string-task-details">
        <span>
          {task.content}
        </span>
        <span className="not-important">
          Created at: {task.dateCreated.toDateString()}
        </span>
        <span className="not-important">
          Expiring at: {task.hasExpired ? task.expireDate?.toDateString() : "Never"}
        </span>
        <span className="not-important">
          Closed at: {!task.isOpen ? task.dateClosed?.toDateString() : "Not yet"}
        </span>
      </div>
    );
  }
}