'use strict';

const { NameValue } = require('./NameValue.js');

class NameValueNode extends NameValue {
  constructor(name, value) {
    super(name, value);
    this.node = this.getNode();
  }

  get isChecked() {
    const checkbox = this.node.firstElementChild;

    return checkbox.checked;
  }

  getNode() {
    const newItem = document.createElement('li');
    const id = `pair-${new Date().getTime()}`;

    newItem.classList.add('list__item');

    newItem.innerHTML = `
      <input
        class="list__item-checkbox"
        type="checkbox"
        id="${id}"
      />

      <label
        for="${id}"
        class="list__item-pair"
      >
        ${this.name} = ${this.value}
      </label>`;

    return newItem;
  }
}

module.exports = { NameValueNode };
