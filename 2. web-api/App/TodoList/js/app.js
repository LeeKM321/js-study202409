// 일정 데이터가 들어 있는 배열을 선언
const todos = [
  {
    id: 1,
    text: '할 일 1',
    done: false, // checkbox를 클릭해서 할 일을 마쳤는지의 여부
  },
  {
    id: 2,
    text: '할 일 2',
    done: false, // checkbox를 클릭해서 할 일을 마쳤는지의 여부
  },
  {
    id: 3,
    text: '할 일 3',
    done: false, // checkbox를 클릭해서 할 일을 마쳤는지의 여부
  },
];

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

// 추가 버튼 클릭 이벤트
document.getElementById('add').addEventListener('click', (e) => {
  e.preventDefault();

  //1. 입력한 텍스트를 읽어오자.
  const $todoText = document.getElementById('todo-text');
  const inputText = $todoText.value;

  // 입력을 안했다면 이벤트 강제 종료.
  if (inputText.trim() === '' || inputText.length > 10) {
    $todoText.style.background = 'orangered';
    $todoText.setAttribute('placeholder', '필수 입력사항입니다!(10자 이내)');
    $todoText.value = '';
    return;
  } else {
    // 제대로 입력이 되었다면 스타일을 초기화
    $todoText.style.background = '';
    $todoText.setAttribute('placeholder', '할 일을 입력하세요');
  }

  // li 생성
  makeTodoItem(inputText);

  // 입력 완료 후 input에 존재하는 문자열 제거.
  $todoText.value = '';
});

// 할 일 완료(체크박스) 이벤트
const $todoList = document.querySelector('ul.todo-list');

$todoList.addEventListener('click', (e) => {
  // checkbox에서만 이벤트가 동작해야 함.
  if (!e.target.matches('input[type=checkbox]')) return;
  // 이벤트가 발생한 주체의 부모를 보내겠다.
  changeCheckState(e.target.parentNode);
});

// 할 일 완료 처리 수행할 함수
const changeCheckState = ($label) => {
  $label.lastElementChild.classList.toggle('checked');

  // 이벤트가 발생한 li와 매칭되는 객체의 done 값도 변경해 주어야 한다.
  const dataId = +$label.parentNode.dataset.id;
  todos[dataId - 1].done = !todos[dataId - 1].done;

  console.log(todos);
};

// 할 일 삭제 이벤트
$todoList.addEventListener('click', (e) => {
  if (!e.target.matches('.todo-list .remove span')) {
    return;
  }
  console.log('삭제 아이콘 클릭!');

  removeTodoData(e.target.parentNode.parentNode); // 삭제할 li를 바로 전달.
});

const removeTodoData = ($delTarget) => {
  $delTarget.classList.add('delMoving');

  // 애니메이션 발동 시간 동안은 remove가 진행되지 않도록
  // setTimeout으로 처리.
  setTimeout(() => {
    $todoList.removeChild($delTarget);
  }, 1500);

  // 배열 내의 객체 삭제하기
  const targetIdx = todos.findIndex(
    (todo) => todo.id === +$delTarget.dataset.id
  );
  todos.splice(targetIdx, 1);

  console.log(todos);
};
// 할 일 수정 이벤트 (수정 모드 진입, 수정 완료)
$todoList.addEventListener('click', (e) => {
  if (e.target.matches('.todo-list .modify span.lnr-undo')) {
    enterModifyMode(e.target); // 수정 모드 진입
  } else if (e.target.matches('.todo-list .modify span.lnr-checkmark-circle')) {
    modifyTodoData(e.target); // 수정모드에서 수정을 확정지으려는 이벤트
  } else return;
});

// 수정 모드 진입 이벤트 함수
const enterModifyMode = ($modSpan) => {
  // 아이콘 교체
  $modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');

  // span.text를 input태그로 교체
  const $label = $modSpan.parentNode.previousElementSibling;
  const $textSpan = $label.lastElementChild;

  // input 태그 만들기
  const $modInput = document.createElement('input');
  //   $modInput.setAttribute('type', 'text') (o, 굳이 하실 필요 없음)
  $modInput.value = $textSpan.textContent;
  $modInput.classList.add('modify-input');

  $label.replaceChild($modInput, $textSpan);
};

// 수정 완료 처리
const modifyTodoData = ($modCompleteSpan) => {
  // 버튼을 원래대로 돌립시다.
  $modCompleteSpan.classList.replace('lnr-checkmark-circle', 'lnr-undo');

  // input을 span.text로 변경
  const $label = $modCompleteSpan.parentNode.previousElementSibling;
  const $modInput = $label.lastElementChild;

  const $textSpan = document.createElement('span');
  $textSpan.textContent = $modInput.value;
  $textSpan.classList.add('text');

  $label.replaceChild($textSpan, $modInput);
};
