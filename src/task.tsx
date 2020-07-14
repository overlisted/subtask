import {computed, observable} from "mobx";
import {format} from "mobx-sync";

export abstract class Task<C> {
  abstract readonly _TYPE: string;

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
  _TYPE = "StringTask";

  constructor(name: string, content: string = "") {
    super(name, content);
  }
}

export function deserializeTask(task: Task<unknown>): Task<unknown> {
  let result: Task<unknown>

  const prototype = taskTypeMap.get(task._TYPE);
  if(!prototype) throw new TypeError(`Unknown task type ${task._TYPE}`);

  result = new (prototype)(task.name);
  Object.assign(result, task);
  if(prototype === GroupTask) { // @ts-ignore
    result.content = result.content.map(it => deserializeTask(it));
  }

  return result;
}

export class GroupTask extends Task<Task<any>[]> {
  _TYPE = "GroupTask";

  @format<Task<unknown>[]>(tasks => tasks.map(deserializeTask))
  @observable content: Task<any>[];

  @computed get dateClosed() {
    let closedChildren = 0;
    let max = 0;
    this.content.forEach(it => {
      if(!it.isOpen) closedChildren++;
      max = Math.max(max, it.dateClosed)
    });

    if(closedChildren < this.content.length) return 0;
    return max;
  }

  set dateClosed(value) {
    this.content.forEach(it => it.dateClosed = value);
  }

  constructor(name: string, content: Task<Task<any>>[] = []) {
    super(name, content);
    this.content = content;
  }
}

const taskTypeMap = new Map<string, new(name: string) => Task<any>>([
  ["StringTask", StringTask],
  ["GroupTask", GroupTask]
]);