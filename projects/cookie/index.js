/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', (e) => {
  listTable.innerHTML = '';

  if (!e.target.value) {
    cookies = getFilterCookie(e.target.value);
  }
  renderTable(cookies);
});

addButton.addEventListener('click', () => {
  if (!addNameInput.value || !addValueInput.value) {
    alert('поля должны быть заполнены');
    return;
  }

  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  listTable.innerHTML = '';
  renderTable(cookies);

  addNameInput.value = '';
  addValueInput.value = '';
});

function isMatching(full, chunk) {
  return full.toUpperCase().indexOf(chunk.toUpperCase()) === -1 ? false : true;
}

const getCookie = () => {
  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});

  return cookies;
};

const getFilterCookie = (filter) => {
  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    if (isMatching(name, filter) || isMatching(value, filter)) {
      prev[name] = value;
    }

    return prev;
  }, {});

  return cookies;
};

const createCell = (el, content) => {
  const elem = document.createElement(el);
  elem.textContent = content;

  return elem;
};

const createRow = (...args) => {
  const row = document.createElement('tr');

  for (let i = 0; i < args.length; i++) {
    row.appendChild(args[i]);
  }

  return row;
};

const addRow = (cookieName, cookieValue) => {
  const name = createCell('td', cookieName);
  const value = createCell('td', cookieValue);
  const action = createCell('button', 'удалить');
  const row = createRow(name, value, action);

  listTable.appendChild(row);

  action.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      listTable.removeChild(row);
      document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  });
};

let cookies = getCookie();

const renderTable = (cookies) => {
  for (const cookie in cookies) {
    addRow(cookie, cookies[cookie]);
  }
};

const init = () => {
  renderTable(cookies);
};
init();
