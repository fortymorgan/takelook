const renderSearchResult = require('./searchResult');
const renderShow = require('./show');
const resetList = require('./resetList');

module.exports = [
  {
    path: '',
    component: () => {
      resetList();
    },
  },
  {
    path: 'search',
    component: (value) => {
      resetList();
      renderSearchResult(value);
    },
  },
  {
    path: 'show',
    component: (value) => {
      resetList();
      renderShow(value);
    },
  }
];
