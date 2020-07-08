import React from 'react';
import './app.css';
import {} from './UILib'
import {observer} from "mobx-react"

class Task {
  name;
  description;
  dateCreated = new Date();
  expireDate = null;
  dateClosed

  constructor(name, description, expireDate) {
    this.name = name;
    this.description = description;
    if(expireDate) this.expireDate = expireDate;

    this.open();
  }

  close() {
    this.dateClosed = new Date();
  }

  open() {
    this.dateClosed = null;
  }

  get completionTook() {
    return this.dateClosed ? new Date(this.dateClosed - this.dateCreated) : null;
  }
}


class App extends React.Component {
  render() {
    return (
      <></>
    )
  }
}

export default App;
