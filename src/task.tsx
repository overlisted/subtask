import {computed, observable} from "mobx";

export abstract class Task<C> {
  @observable name: string;
  @observable content: C;
  @observable dateCreated: number = new Date().getTime();
  @observable expireDate: number = 0;
  @observable dateClosed: number = 0;

  constructor(name: string, content: C) {
    this.name = name;
    this.content = content;

    this.isOpen = true;
  }

  @computed get isOpen() {
    return !this.dateClosed;
  }

  @computed get hasExpired() {
    return !this.expireDate;
  }

  @computed get completionTook() {
    return this.dateClosed ? this.dateClosed - this.dateCreated : null;
  }

  set isOpen(is: boolean) {
    this.dateClosed = is ? 0 : new Date().getTime();
  }
}

export class StringTask extends Task<string> {
  constructor(name: string, content: string = "") {
    super(name, content);
  }
}

function deserializeTask(task: Task<unknown>): Task<unknown> {
  let result: Task<unknown>;

  switch(task._TYPE) {
    case "StringTask": {
      result = new StringTask(task.name);
      break;
    }
    case "GroupTask": {
      result = new GroupTask(task.name);
      break;
    }
    default: throw new TypeError(`Unknown task type ${task._TYPE}`);
  }

  result.content = task.content;
  result.dateCreated = task.dateCreated;
  result.expireDate = task.expireDate;
  result.dateClosed = task.dateClosed;

  return result;
}

export class GroupTask extends Task<Task<any>[]> {
  @computed get dateClosed() {
    let max = 0;
    this.content.forEach(it => max = Math.max(max, it.dateClosed));

    return max;
  }

  set dateClosed(value) {
    this.content.forEach(it => it.dateClosed = value);
  }

  constructor(name: string, content: Task<Task<any>>[] = []) {
    super(name, content);
  }
}