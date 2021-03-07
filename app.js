const auth = '563492ad6f917000010000011f1e95b48cf4435fa24b8bc742ad5502';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;
const more = document.querySelector('.more');
let page = 1;
let fetchLink;

//Event Listeners
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});
more.addEventListener('click', loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
    <div class="gallery-info"> 
    <p>${textAbstract(photo.photographer)}</p>
    <a href=${photo.src.original}>Download</a>
    </div>
    <img src=${photo.src.large}></img>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchApi(
    'https://api.pexels.com/v1/curated?per_page=15&page=1'
  );
  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

function textAbstract(text) {
  if (text == null) {
    return '';
  }
  if (text.length <= 23) {
    return text;
  }

  text = text.substring(0, 23);
  last = text.lastIndexOf(' ');
  text = text.substring(0, last);
  return text + '...';
}

async function loadMore() {
  page++;
}

curatedPhotos();
