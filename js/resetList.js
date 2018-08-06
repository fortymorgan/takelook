const contentDiv = document.querySelector('.content');
const input = document.querySelector('.search');

module.exports = () => {
  contentDiv.innerHTML = '';
  input.value = '';
};
