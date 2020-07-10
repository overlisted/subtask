import React from "react";
import {observer} from "mobx-react";

export interface SwitcherOptionData {}

export interface SwitcherOptionProps<T extends SwitcherOptionData> {
  element: T;
  isActive(): boolean;
  activate(): void;
}

export interface SwitcherStore {
  optionsData: SwitcherOptionData[];
  activeOption: SwitcherOptionData | null;
}

interface SwitcherPropsData {
  store: SwitcherStore;
  Component: new (props: any) => React.Component<SwitcherOptionProps<SwitcherOptionData>>;
}

@observer
export class Switcher extends React.Component<SwitcherPropsData> {
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