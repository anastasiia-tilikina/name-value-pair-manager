'use strict';

const { InputData } = require('./InputData.js');
const { Xml } = require('./Xml.js');
const { NameValue } = require('./NameValue.js');
const { NameValueList } = require('./NameValueList.js');

// Creating data variable in case we need to store data in the future
let data = [];

const from = document.querySelector('.from');

const sortByName = document.querySelector('#sort-by-name');
const sortByValue = document.querySelector('#sort-by-value');
const deleteItems = document.querySelector('#delete');
const deleteAll = document.querySelector('#delete-all');
const showXML = document.querySelector('#show-xml');

const nameValueList = new NameValueList(data);
const inputData = new InputData();

from.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputData.error) {
    inputData.setInputError();

    return;
  }

  const [name, value] = inputData.formattedData;

  nameValueList.add(name, value);
  nameValueList.render();

  data.push(new NameValue(name, value));

  const xml = new Xml(nameValueList.list);

  xml.render();

  inputData.clear();
});

inputData.input.addEventListener('input', () => {
  inputData.removeInputError();
});

sortByName.addEventListener('click', () => {
  nameValueList.sortBy('name');
  nameValueList.render();

  const xml = new Xml(nameValueList.list);

  xml.render();
});

sortByValue.addEventListener('click', () => {
  nameValueList.sortBy('value');
  nameValueList.render();

  const xml = new Xml(nameValueList.list);

  xml.render();
});

deleteItems.addEventListener('click', () => {
  nameValueList.deleteChecked();

  data = nameValueList.list.map(
    ({ name, value }) => new NameValue(name, value)
  );

  nameValueList.render();

  const xml = new Xml(nameValueList.list);

  xml.render();
});

deleteAll.addEventListener('click', () => {
  nameValueList.clear();

  data.length = 0;

  nameValueList.render();

  const xml = new Xml(nameValueList.list);

  xml.render();
});

showXML.addEventListener('click', () => {
  const xml = new Xml(nameValueList.list);

  xml.toggle();

  if (!xml.isShown) {
    showXML.innerHTML = 'Show XML';
  } else {
    showXML.innerHTML = 'Hide XML';
  }

  xml.render();
});
