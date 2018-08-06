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
    component: () => {
      resetList();
      renderSearchResult();
    },
  },
  {
    path: 'show',
    component: () => {
      resetList();
      renderShow();
    },
  }
];
