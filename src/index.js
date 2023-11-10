import axios from 'axios';

const apiKey = '40581736-d4df81fdfae18c25a1eb903af';
const baseUrl = 'https://pixabay.com/api/';
let pageNum = 1;

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.loadMoreBtn.hidden = true;
refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  pageNum = 1;

  // const searchParams = new URLSearchParams({
  //   key: apiKey,
  //   q: e.target.elements.searchQuery.value,
  //   image_type: 'photo',
  //   orientation: 'horizontal',
  //   safesearch: 'true',
  //   per_page: 40,
  //   page: pageNum,
  // });

  refs.gallery.innerHTML = '';
  // // console.log(e.target.elements.searchQuery.value);
  // const response = await axios.get(`${baseUrl}?${searchParams}`);
  // const responseDataArr = response.data.hits;
  // // console.log(response.data.hits);
  const photos = await fetchPhotos();
  renderPhotos(photos);
  pageNum += 1;

  // if (response.data.totalHits > 40) {
  //   refs.loadMoreBtn.hidden = false;
  //   refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
  // } else {
  //   refs.loadMoreBtn.hidden = true;
  //   alert("We're sorry, but you've reached the end of search results.");
  // }

  async function onLoadMoreBtnClick() {
    //   pageNum += 1;
    //   const response = await axios.get(`${baseUrl}?${searchParams}`);
    //   const responseDataArr = response.data.hits;

    //   renderPhotos(responseDataArr);

    //   if (response.data.totalHits > 40) {
    //     refs.loadMoreBtn.hidden = false;
    //     refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    //   } else {
    //     refs.loadMoreBtn.hidden = true;
    //     alert("We're sorry, but you've reached the end of search results.");
    //   }
    // }
    const photos = await fetchPhotos();
    renderPhotos(photos);
    pageNum += 1;
  }
  async function fetchPhotos() {
    // const params = new URLSearchParams({
    //   _limit: perPage,
    //   _page: page
    // });
    const searchParams = new URLSearchParams({
      key: apiKey,
      q: e.target.elements.searchQuery.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: pageNum,
    });

    // const response = await axios.get(
    //   `https://jsonplaceholder.typicode.com/posts?${params}`
    // );
    // console.log(e.target.elements.searchQuery.value);
    const response = await axios.get(`${baseUrl}?${searchParams}`);
    const responseDataArr = response.data.hits;
    // // console.log(response.data.hits);
    if (response.data.totalHits > 40) {
      refs.loadMoreBtn.hidden = false;
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    } else {
      refs.loadMoreBtn.hidden = true;
      alert("We're sorry, but you've reached the end of search results.");
    }
    return responseDataArr;
  }
  function photoTemplate(photo) {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
      id,
    } = photo;

    return `<li class='list-item id="${id}"><div class="photo-card">
	<img src="${webformatURL}" alt="${tags}" loading="lazy" />
	<div class="info">
		<p class="info-item">
			<b>${likes}</b>
		</p>
		<p class="info-item">
			<b>${views}</b>
		</p>
		<p class="info-item">
			<b>${comments}</b>
		</p>
		<p class="info-item">
			<b>${downloads}</b>
		</p>
	</div>
</div></li>`;
  }
  function galleryTemplate(photosArray) {
    return photosArray.map(photoTemplate).join('\n');
  }
  function renderPhotos(photosArray) {
    const markup = galleryTemplate(photosArray);
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      `<ul class ='gallery-list'>${markup}</ul>`
    );
  }
}
