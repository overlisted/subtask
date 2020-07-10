import React from "react";
import {observer} from "mobx-react";

export interface SwitcherOptionData {}

export interface SwitcherOptionProps<T extends SwitcherOptionData> {
  element: T;
  isActive(): boolean;
  activate(): void;
}

export interface SwitcherStore<T extends SwitcherOptionData> {
  optionsData: T[];
  activeOption: T | null;
}

interface SwitcherPropsData<T extends SwitcherOptionData> {
  store: SwitcherStore<T>;
  Component: new (props: any) => React.Component<SwitcherOptionProps<SwitcherOptionData>>;
}

@observer
export class Switcher<OptionData extends SwitcherOptionData> extends React.Component<SwitcherPropsData<OptionData>> {
  render() {
    const {Component, store} = this.props;

    return store.optionsData.map(it => {
      return <Component
        element={it}
        isActive={() => store.activeOption === it}
        activate={() => {store.activeOption = it}}
      />
    })
  }
}