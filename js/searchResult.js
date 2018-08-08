const pushHistoryState = require('./pushHistory');
const render = require('./render');

module.exports = async searchValue => {
  const contentDiv = document.querySelector('.content');
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

    const { image, _links: { self: { href } }, name, genres } = show;
    const [_, __, showId] = new URL(href).pathname.split('/');

    const img = document.createElement('img');
    if (!image) {
      img.src = '/static/no-image.png';
    } else {
      img.src = image.medium
    }
    img.setAttribute('width','150');
    img.addEventListener('click', () => {
      pushHistoryState('show', showId);
      render.render();
    });
    listItem.append(img);

    const nameAndGenres = document.createElement('div');
    nameAndGenres.classList.add('name-genres');
    
    const showName = document.createElement('h2');
    showName.classList.add('show-name');
    showName.innerText = name;
    showName.addEventListener('click', () => {
      pushHistoryState('show', showId);
      render.render();
    });
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
