import {SwitcherOptionData} from "./UILib/switcher";
import {computed, observable} from "mobx";

export class TaskList {
  @observable tasks: Task[] = [];
  @observable selected: Task | null = null;
}

type TaskDate = Date | null;

export class Task implements SwitcherOptionData {
  @observable name: string;
  description: string;
  dateCreated: Date = new Date();
  expireDate: TaskDate;
  @observable dateClosed: TaskDate = null;

  constructor(name: string, description: string = "", expireDate: TaskDate = null) {
    this.name = name;
    this.description = description;
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

  set isOpen(is: boolean) {
    this.dateClosed = is ? null : new Date();
  }
}