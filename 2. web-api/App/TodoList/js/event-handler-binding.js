import makeTodoItem from './todo-insert.js';
import changeCheckState from './todo-done.js';
import removeTodoData from './todo-remove.js';
import { enterModifyMode, modifyTodoData } from './todo-modify.js';

const handlerBinding = () => {
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

  // 할 일 삭제 이벤트
  $todoList.addEventListener('click', (e) => {
    if (!e.target.matches('.todo-list .remove span')) {
      return;
    }
    console.log('삭제 아이콘 클릭!');

    removeTodoData(e.target.parentNode.parentNode); // 삭제할 li를 바로 전달.
  });

  // 할 일 수정 이벤트 (수정 모드 진입, 수정 완료)
  $todoList.addEventListener('click', (e) => {
    if (e.target.matches('.todo-list .modify span.lnr-undo')) {
      enterModifyMode(e.target); // 수정 모드 진입
    } else if (
      e.target.matches('.todo-list .modify span.lnr-checkmark-circle')
    ) {
      modifyTodoData(e.target); // 수정모드에서 수정을 확정지으려는 이벤트
    } else return;
  });
};

export default handlerBinding;
