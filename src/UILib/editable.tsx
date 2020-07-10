import React from "react";
import {observer} from "mobx-react";
import classNames from "classnames";

interface FieldProps {
  isTextarea?: boolean;
  className?: string;
  value: string;
  setValue(value: string): void
}

@observer
export class Field extends React.Component<FieldProps> {
  render() {
    let {isTextarea, value, className, setValue} = this.props;

    if(isTextarea) return (
      <textarea
        className={classNames("field", className)}
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
      />
    );

    return (
      <input
        className={classNames("field", className)}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    );
  }
}