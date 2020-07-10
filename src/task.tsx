import {SwitcherOptionData} from "./UILib/switcher";
import {computed, observable} from "mobx";

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
    return !!this.dateClosed;
  }

  @computed get hasExpired() {
    return !!this.expireDate;
  }

  @computed get completionTook() {
    return this.dateClosed ? this.dateClosed.getTime() - this.dateCreated.getTime() : null;
  }

  set isOpen(is: boolean) {
    this.dateClosed = is ? null : new Date();
  }
}

export class TaskStore {
  @observable tasks: Task[] = [new Task("name", "desc"), new Task("another", "another desc")];
  @observable selected: Task | null = null;
}