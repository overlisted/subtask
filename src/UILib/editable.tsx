import React from "react";
import {observer} from "mobx-react";
import classNames from "classnames";

interface FieldProps {
  className?: string;
  value: string;
  setValue(value: string): void
  isTextarea?: boolean;
  onHitEnter?(e: React.KeyboardEvent): void;
  onHitEscape?(e: React.KeyboardEvent): void;
}

@observer
export class Field extends React.Component<FieldProps> {
  onKeyPress = (e: React.KeyboardEvent) => {
    switch(e.key) {
      case "Enter": this.props.onHitEnter?.call(this, e); break;
      case "Escape": this.props.onHitEscape?.call(this, e); break;
    }
  }

  render() {
    let {isTextarea, value, className, setValue} = this.props;

    if(isTextarea) return (
      <textarea
        className={classNames("field", className)}
        value={value}
        onChange={e => {
          setValue(e.target.value)
        }}
        onKeyDown={this.onKeyPress}
      />
    );

    return (
      <input
        className={classNames("field", className)}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={this.onKeyPress}
      />
    );
  }
}