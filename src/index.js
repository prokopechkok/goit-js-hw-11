import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '40581736-d4df81fdfae18c25a1eb903af';
const baseUrl = 'https://pixabay.com/api/';
let pageNum = 1;

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  galleryList: document.querySelector('.gallery-list'),
  loadMoreBtn: document.querySelector('.load-more'),
};
refs.loadMoreBtn.hidden = true;
refs.searchForm.addEventListener('submit', onSearch);
const lightbox = new SimpleLightbox('.gallery_link', {
  captionsData: 'alt',
  captionDelay: 200,
});
async function onSearch(e) {
  e.preventDefault();
  pageNum = 1;

  refs.galleryList.innerHTML = '';

  const photos = await fetchPhotos();
  renderPhotos(photos);
  lightbox.refresh();
  pageNum += 1;

  async function onLoadMoreBtnClick() {
    const photos = await fetchPhotos();
    renderPhotos(photos);
    lightbox.refresh();
    pageNum += 1;
  }
  async function fetchPhotos() {
    const searchParams = new URLSearchParams({
      key: apiKey,
      q: e.target.elements.searchQuery.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: pageNum,
    });

    const response = await axios.get(`${baseUrl}?${searchParams}`);
    const responseDataArr = response.data.hits;

    if (response.data.totalHits > 40) {
      refs.loadMoreBtn.hidden = false;
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    } else {
      refs.loadMoreBtn.hidden = true;
      alert("We're sorry, but you've reached the end of search results.");
    }
    return responseDataArr;
    // } catch (error) {
    //   console.log(error);
    // }
  }
  // function renderPhotos(arr) {
  function photoTemplate(photo) {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = photo;

    return `<li class="list-item" ><div class="photo-card">
    <a href="${largeImageURL}" class="gallery_link"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
    refs.galleryList.insertAdjacentHTML('beforeend', markup);
  }
}
