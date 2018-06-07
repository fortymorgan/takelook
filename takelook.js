const input = document.querySelector('.search');
const button = document.querySelector('.search-button');
const contentDiv = document.querySelector('.content');

button.addEventListener('click', () => renderSearch(input.value));
input.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    renderSearch(input.value);
  }
});

const resetResult = () => {
  contentDiv.innerHTML = '';
  input.value = '';
}

const renderSearch = async searchValue => {
  resetResult();
  const header = document.createElement('h1');
  header.classList.add('search-head');
  header.innerText = 'Search result';
  contentDiv.appendChild(header);

  const searchUrl = `http://api.tvmaze.com/search/shows?q=${searchValue.replace(' ', '%20')}`;
  const searchResult = await fetch(searchUrl)
    .then(blob => blob.json());

  const searchResultList = document.createElement('ul');
  searchResult.forEach(result => {
    const listItem = document.createElement('li');
    const show = result.show;

    const img = document.createElement('img');
    if (!show.image) {
      img.src = 'no-image.png';
    } else {
      img.src = show.image.medium
    }
    img.setAttribute('width','150');
    listItem.appendChild(img);

    const name = document.createElement('h2');
    name.classList.add('show-name');
    name.innerText = show.name;
    listItem.appendChild(name);

    const genres = document.createElement('p');
    genres.classList.add('genres');
    const genresList = show.genres.map(genre => `<span class="genre">${genre}</span>`);
    genres.innerHTML = `Genres ${genresList.join(', ')}`;
    listItem.appendChild(genres);

    searchResultList.appendChild(listItem);
  });
  contentDiv.appendChild(searchResultList);
};