import todos from './global-var.js';

const removeTodoData = ($delTarget) => {
  $delTarget.classList.add('delMoving');

  // 애니메이션 발동 시간 동안은 remove가 진행되지 않도록
  // setTimeout으로 처리.
  setTimeout(() => {
    $delTarget.parentNode.removeChild($delTarget);
  }, 1500);

  // 배열 내의 객체 삭제하기
  const targetIdx = todos.findIndex(
    (todo) => todo.id === +$delTarget.dataset.id
  );
  todos.splice(targetIdx, 1);

  console.log(todos);
};

export default removeTodoData;
