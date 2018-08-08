const { render } = require('./render');
const pushHistoryState = require('./pushHistory');

const input = document.querySelector('.search');
const button = document.querySelector('.search-button');

button.addEventListener('click', () => {
  pushHistoryState('search', input.value);
  render();
});

input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    pushHistoryState('search', input.value);
    render();
  }
});

window.onpopstate = render;

render();
