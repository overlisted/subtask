import React from "react";
import {observer} from "mobx-react";

export interface SwitcherOptionData {}

export interface SwitcherOptionProps<T extends SwitcherOptionData> {
  element: T;
  isActive(): boolean;
  activate(): void;
}

interface SwitcherPropsData<OptionData extends SwitcherOptionData> {
  Component: new (props: any) => React.Component<SwitcherOptionProps<OptionData>>;
  readonly optionsData: OptionData[];

  readonly activeOption: OptionData | null;
  setActiveOption(value: OptionData | null): void;
}

@observer
export class Switcher<OptionData extends SwitcherOptionData> extends React.Component<SwitcherPropsData<OptionData>> {
  render() {
    const {Component, optionsData, activeOption, setActiveOption} = this.props;

    return optionsData.map(it => {
      return <Component
        element={it}
        isActive={() => activeOption === it}
        activate={() => setActiveOption(it)}
      />
    })
  }
}