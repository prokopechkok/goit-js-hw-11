import { refs } from './refs';
import { renderGaleryMarkup } from './renderFunctions';
import { getPicturesFromApi } from './getPicturesFromApi';
import { refs } from './refs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const lightbox = new SimpleLightbox('.gallery_link', {
  captionDelay: 200,
});

let pageNum = 1;
//================================================================================
export async function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();

  if (!searchQuery) return;

  pageNum = 1;
  refs.galleryList.innerHTML = '';
  //тут треба ховати кнопку лоадмор

  const { data } = await getPicturesFromApi(searchQuery, pageNum);
  //тут її повернути?
  checkData(data, searchQuery, pageNum);
}
//================================================================================

function checkData(data, searchQuery, pageNum) {
  const responseDataArr = data.hits;

  if (data.totalHits === 0) {
    refs.loadMoreBtn.hidden = true;
    Notify.failure(`No images were found for the query "${searchQuery}"`, {
      position: 'right-top',
      clickToClose: true,
      timeout: 3000,
    });
    return;
  }

  if (pageNum === 1) {
    Notify.success(`"Hooray! We found ${data.totalHits} images."`, {
      position: 'right-top',
      clickToClose: true,
      timeout: 3000,
    });
  }

  if (data.totalHits <= 40 || pageNum === Math.ceil(data.totalHits / 40)) {
    refs.loadMoreBtn.style.display = 'none';
    renderGaleryMarkup(responseDataArr);
    lightbox.refresh();
    Notify.failure(
      `We're sorry, but you've reached the end of search results.`,
      {
        position: 'right-top',
        clickToClose: true,
        timeout: 3000,
      }
    );
  } else {
    renderGaleryMarkup(responseDataArr);
    lightbox.refresh();
    refs.loadMoreBtn.style.display = 'block';
    refs.loadMoreBtn.addEventListener('click', onLoadMore);
  }
}
//================================================================================

async function onLoadMore() {
  pageNum++;
  const searchQuery = refs.searchForm.elements.searchQuery.value.trim();
  const { data } = await getPicturesFromApi(
    refs.searchForm.elements.searchQuery.value,
    pageNum
  );
  checkData(data, searchQuery, pageNum);
}
