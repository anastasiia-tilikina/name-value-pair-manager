'use strict';

class InputData {
  constructor() {
    this.input = document.querySelector('.from__input');
    this.errorNode = document.querySelector('.from__error-message');
  }

  get formattedData() {
    return this.input.value.split('=').map((item) => item.trim());
  }

  get error() {
    const testString = /^[\s]*[a-z0-9]+[\s]*[=]\s*[a-z0-9]+[\s]*$/gi;

    if (!this.input.value.trim()) {
      return 'Input can not be empty';
    }

    if (!testString.test(this.input.value)) {
      return 'Incorrect input format';
    }

    return null;
  }

  setInputError() {
    this.input.classList.add('from__input--error');

    this.errorNode.innerHTML = this.error;
    this.errorNode.classList.add('from__error-message--shown');
  }

  removeInputError() {
    this.input.classList.remove('from__input--error');

    this.errorNode.classList.remove('from__error-message--shown');
  }

  clear() {
    this.input.value = '';
  }
}

module.exports = { InputData };
