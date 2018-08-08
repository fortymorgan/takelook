module.exports = async (id) => {
  const contentDiv = document.querySelector('.content');
  const show = document.createElement('div');
  show.classList.add('show');

  const searchUrl = `http://api.tvmaze.com/shows/${id}`;
  const { name, image, summary } = await fetch(searchUrl)
    .then(blob => blob.json());

  const showName = document.createElement('h1');
  showName.classList.add('show-name');
  showName.innerText = name;
  contentDiv.append(showName);

  const img = document.createElement('img');
  if (!image) {
    img.src = '/static/no-image.png';
  } else {
    img.src = image.medium
  }
  show.append(img);

  const showSummary = document.createElement('div');
  showSummary.classList.add('summary');
  showSummary.innerHTML = summary;
  show.append(showSummary);

  contentDiv.append(show);

  const episodesData = await fetch(`${searchUrl}/episodes`)
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
  episodesData.map(({ season, number, name, airdate }) => {
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

  episodes.append(episodesTable);

  contentDiv.append(episodes);
};