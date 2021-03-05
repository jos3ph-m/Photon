const auth = '563492ad6f917000010000011f1e95b48cf4435fa24b8bc742ad5502';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');
let searchValue;

async function curatedPhotos() {
  const dataFetch = await fetch(
    'https://api.pexels.com/v1/curated?per_page=15&page=1',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: auth,
      },
    }
  );
}
