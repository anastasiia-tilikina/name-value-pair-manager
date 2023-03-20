'use strict';

const { NameValueNode } = require('./NameValueNode.js');

class NameValueList {
  constructor(list = []) {
    this.list = list.map(({ name, value }) => new NameValueNode(name, value));

    this.render(); // render list on init in case we have initial data
  }

  add(name, value) {
    this.list = [...this.list, new NameValueNode(name, value)];
  }

  render() {
    const list = document.querySelector('.list');

    list.innerHTML = '';

    this.list.forEach(item => {
      list.append(item.node);
    });
  }

  sortBy(key) {
    this.list.sort((a, b) => a[key].localeCompare(b[key]));
  }

  deleteChecked() {
    this.list = this.list.filter(item => !item.isChecked);
  }

  clear() {
    this.list.length = 0;
  }
}

module.exports = { NameValueList };
