import todos from './global-var.js';

// 화면에 표현할 li.todo-list-item 노드를 생성하는 함수 정의
const makeTodoItem = (inputText) => {
  const $li = document.createElement('li');
  const $label = document.createElement('label');
  const $divMod = document.createElement('div');
  const $divRem = document.createElement('div');

  // label 작업
  $label.classList.add('checkbox');
  const $check = document.createElement('input');
  $check.setAttribute('type', 'checkbox');
  const $span = document.createElement('span');
  $span.classList.add('text');
  $span.textContent = inputText;
  $label.appendChild($check);
  $label.appendChild($span);

  // 수정 div 태그 작업
  $divMod.classList.add('modify');
  const $modIcon = document.createElement('span');
  // 클래스 이름 두 개 이상 add 하실 때 각각 주시면 돼요. 공백 넣지 마세요.
  // $modIcon.classList.add('lnr lnr-undo'); (x)
  $modIcon.classList.add('lnr', 'lnr-undo');
  $divMod.appendChild($modIcon);

  // 삭제 div 태그 작업
  $divRem.classList.add('remove');
  const $remIcon = document.createElement('span');
  $remIcon.classList.add('lnr', 'lnr-cross-circle');
  $divRem.appendChild($remIcon);

  // 배열 안에 Todo 내용을 객체로 포장해서 추가
  const newTodo = {
    id: makeNewId(),
    text: inputText,
    done: false,
  };

  todos.push(newTodo);

  // li 태그 작업
  $li.classList.add('todo-list-item');
  $li.dataset.id = newTodo.id;

  [$label, $divMod, $divRem].forEach(($ele) => $li.appendChild($ele));

  // ul 태그를 지목해서 $li를 자식으로 추가
  document.querySelector('.todo-list').appendChild($li);

  console.log(todos);
};

const makeNewId = () => {
  return todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
  // if (todos.length > 0) {
  //     return todos[todos.length-1].id + 1;
  // } else {
  //     return 1;
  // }
};

export default makeTodoItem;
