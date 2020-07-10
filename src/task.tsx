import {SwitcherOptionData} from "./UILib/switcher";
import {computed, observable} from "mobx";

export class TaskList<C> {
  @observable tasks: Task<C>[] = [];
  @observable selected: Task<C> | null = null;
}

type TaskDate = Date | null;

export class Task<C> implements SwitcherOptionData {
  @observable name: string;
  @observable content: C;
  dateCreated: Date = new Date();
  expireDate: TaskDate;
  @observable dateClosed: TaskDate = null;

  constructor(name: string, content: C, expireDate: TaskDate = null) {
    this.name = name;
    this.content = content;
    this.expireDate = expireDate;

    this.isOpen = true;
  }

  @computed get isOpen() {
    return !this.dateClosed;
  }

  @computed get hasExpired() {
    return !this.expireDate;
  }

  @computed get completionTook() {
    return this.dateClosed ? this.dateClosed.getTime() - this.dateCreated.getTime() : null;
  }

  get key() {
    return this.dateCreated.getTime();
  }

  set isOpen(is: boolean) {
    this.dateClosed = is ? null : new Date();
  }
}