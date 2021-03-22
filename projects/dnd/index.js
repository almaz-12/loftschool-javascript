/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

export function createDiv() {
  const elementSideValue = `${Math.floor(Math.random() * 250)}px`;
  const positionElement = `${Math.floor(Math.random() * 100)}px`;
  const div = document.createElement('div');

  div.style.width = elementSideValue;
  div.style.height = elementSideValue;
  div.style.top = positionElement;
  div.style.left = positionElement;
  div.style.background = 'gray';
  div.classList.add('draggable-div');

  return div;
}

function dragAndDrop(elem) {
  elem.onmousedown = function (event) {
    elem.style.zIndex = 1000;
    document.body.append(elem);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
      elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    elem.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      elem.onmouseup = null;
    };
  };

  elem.ondragstart = function () {
    return false;
  };
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);

  dragAndDrop(div);
});
