import todos from './global-var.js';

// 할 일 완료 처리 수행할 함수
export default ($label) => {
  $label.lastElementChild.classList.toggle('checked');

  // 이벤트가 발생한 li와 매칭되는 객체의 done 값도 변경해 주어야 한다.
  const dataId = +$label.parentNode.dataset.id;
  todos[dataId - 1].done = !todos[dataId - 1].done;

  console.log(todos);
};
