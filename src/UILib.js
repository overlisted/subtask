import React from "react";

class SwitchElement extends React.Component {
  render() {
    return <div
      className={"button switch-element" + (this.isActive ? " active" : "") + " " + this.props.className}
      onClick={() => this.props.activate(this.props.index)}
    >
      {this.props.children}
    </div>
  }

  get isActive() {
    return this.props.getActive() === this.props.index;
  }
}

export function Switcher(props) {
  return (
    <div-place class={props.className}>
      {
        props.options.map((it, i) => {
          return <SwitchElement
            index={i}
            activate={props.activate}
            getActive={props.getActive}
            className={it.className}
          >
            {it.element}
          </SwitchElement>
        })
      }
    </div-place>
  )
}