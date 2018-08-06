const render = require('./render');
const pushHistoryState = require('./pushHistory');

const renderSearch = async searchValue => {
  const header = document.createElement('h1');
  header.classList.add('search-head');
  header.innerText = 'Search result';
  contentDiv.append(header);

  const searchUrl = `http://api.tvmaze.com/search/shows?q=${searchValue.replace(' ', '%20')}`;
  const searchResult = await fetch(searchUrl)
    .then(blob => blob.json());

  const searchResultList = document.createElement('ul');
  searchResult.forEach(({ show }) => {
    const listItem = document.createElement('li');

    const { image, _links, name, genres } = show;

    const img = document.createElement('img');
    if (!image) {
      img.src = 'no-image.png';
    } else {
      img.src = image.medium
    }
    img.setAttribute('width','150');
    img.addEventListener('click', () => renderShow(_links.self));
    listItem.append(img);

    const nameAndGenres = document.createElement('div');
    nameAndGenres.classList.add('name-genres');
    
    const showName = document.createElement('h2');
    showName.classList.add('show-name');
    showName.innerText = name;
    showName.addEventListener('click', () => renderShow(_links.self));
    nameAndGenres.append(showName);

    const showGenres = document.createElement('p');
    showGenres.classList.add('genres');
    const genresList = genres.map(genre => `<span class="genre">${genre}</span>`);
    showGenres.innerHTML = `Genres ${genresList.join(', ')}`;
    nameAndGenres.append(showGenres);

    listItem.append(nameAndGenres);

    searchResultList.append(listItem);
  });
  contentDiv.append(searchResultList);
};

module.exports = async () => {
  const contentDiv = document.querySelector('.content')
}