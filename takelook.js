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
    
    const showName = document.createElement('h2');
    showName.classList.add('show-name');
    showName.innerText = name;
    showName.addEventListener('click', () => renderShow(_links.self));
    listItem.append(showName);

    const showGenres = document.createElement('p');
    showGenres.classList.add('genres');
    const genresList = genres.map(genre => `<span class="genre">${genre}</span>`);
    showGenres.innerHTML = `Genres ${genresList.join(', ')}`;
    listItem.append(showGenres);

    searchResultList.append(listItem);
  });
  contentDiv.append(searchResultList);
};

const renderShow = async ({ href }) => {
  resetResult();
  const show = document.createElement('div');
  show.classList.add('show');

  const { name, image, summary } = await fetch(href)
    .then(blob => blob.json());

  const showName = document.createElement('h1');
  showName.classList.add('show-name');
  showName.innerText = name;
  show.append(showName);

  const img = document.createElement('img');
  if (!image) {
    img.src = 'no-image.png';
  } else {
    img.src = image.medium
  }
  show.append(img);

  const showSummary = document.createElement('div');
  showSummary.classList.add('summary');
  showSummary.innerHTML = summary;
  show.append(showSummary);

  contentDiv.append(show);

  const episodesData = await fetch(`${href}/episodes`)
    .then(blob => blob.json());

  const episodes = document.createElement('div');
  episodes.classList.add('episodes');

  const episodesHeader = document.createElement('h2');
  episodesHeader.innerText = 'Previous Episodes';
  episodes.append(episodesHeader);

  const episodesTable = document.createElement('table');

  const thead = document.createElement('thead');
  const theadRow = document.createElement('tr')
  theadRow.innerHTML = '<th class="episode">Episode Name</th><th class="airdate">Airdate</th>';
  thead.append(theadRow);
  episodesTable.append(thead);

  const tbody = document.createElement('tbody');
  const tbodyRows = episodesData.map(({ season, number, name, airdate }) => {
    const nameSpan = `<span class="episode-name">${name}</span>`;
    const episodeName = `${season}x${number < 10 ? '0' + number: number}: ${nameSpan}`;
    const episodeAirdate = moment(airdate).format('MMM DD, YYYY');
    return `<td class="episode">${episodeName}</td><td class="airdate">${episodeAirdate}</td>`;
  }).forEach(row => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = row;
    tbody.prepend(tableRow);
  });
  episodesTable.append(tbody);

  contentDiv.append(episodesTable);
};