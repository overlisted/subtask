import {computed, observable} from "mobx";

export class Task<C> {
  @observable name: string;
  @observable content: C;
  @observable dateCreated: number = new Date().getTime();
  @observable expireDate: number;
  @observable dateClosed: number = 0;

  constructor(name: string, content: C, expireDate: number = 0) {
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
    return this.dateClosed ? this.dateClosed - this.dateCreated : null;
  }

  set isOpen(is: boolean) {
    this.dateClosed = is ? 0 : new Date().getTime();
  }
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

  constructor(name: string, content: Task<Task<any>>[] = [], expireDate: number = 0) {
    super(name, content, expireDate);
  }
}