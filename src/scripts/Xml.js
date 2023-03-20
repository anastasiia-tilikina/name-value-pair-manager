'use strict';

class Xml {
  constructor(list = []) {
    this.xmlContainer = document.querySelector('.xml');
    this.list = list;
  }

  get isShown() {
    return this.xmlContainer.classList.contains('xml--shown');
  }

  getXml() {
    const openBracket = '<span class="xml__bracket">&lt;</span>';
    const openCloseBracket = '<span class="xml__bracket">&lt;/</span>';
    const closeBracket = '<span class="xml__bracket">&gt;</span>';

    const openTagBracket = (tag) => (
      `<span class="xml__tag">${openBracket}${tag}${closeBracket}</span>`
    );

    const closeTagBracket = (tag) => (
      `<span class="xml__tag">${openCloseBracket}${tag}${closeBracket}</span>`
    );

    const textTag = (text) => `<span class="xml__text">${text}</span>`;

    return `
    <div class="xml__line">
      ${openBracket}?xml version="1.0" encoding="UTF-8"?${closeBracket}
    </div>

    <div class="xml__container">
      <div class="xml__line">
        ${openTagBracket('list')}
      </div>

      ${this.list.map(({ name, value }) => (
    `<div class="xml__container">
          <div class="xml__line">
            ${openTagBracket('item')}
          </div>

          <div class="xml__container">
            <div class="xml__line">
              ${openTagBracket('name')}${textTag(name)}${closeTagBracket('name')}
            </div>

            <div class="xml__line">
              ${openTagBracket('value')}${textTag(value)}${closeTagBracket('value')}
            </div>
          </div>

          <div class="xml__line">
            ${closeTagBracket('item')}
          </div>
        </div>
          `)).join('')}

      <div class="xml__line">
        ${closeTagBracket('list')}
      </div>
    </div>`;
  }

  getEmptyXml() {
    return 'There is no data to show';
  }

  render() {
    if (!this.list.length) {
      this.xmlContainer.innerHTML = this.getEmptyXml();

      return;
    }

    this.xmlContainer.innerHTML = this.getXml();
  }

  toggle() {
    this.xmlContainer.classList.toggle('xml--shown');
  }
}

module.exports = { Xml };
