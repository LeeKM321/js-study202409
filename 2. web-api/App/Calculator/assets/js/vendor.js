// 프로그램에서 전역적으로 사용할 변수, 함수 정의
const $userInput = document.getElementById('input-number');
const $addBtn = document.getElementById('btn-add');
const $subtractBtn = document.getElementById('btn-subtract');
const $multiplyBtn = document.getElementById('btn-multiply');
const $divideBtn = document.getElementById('btn-divide');

const $currentResultOutput = document.getElementById('current-result');
const $currentCalculationOutput = document.getElementById(
  'current-calculation'
);

const $logEntries = document.querySelector('.log-entries');

// 현재 계산기에 그려질 숫자
let currentResult = 0;

// 로그를 모아놓을 배열
const logArray = [];

let seq = 0; // 로그 번호
