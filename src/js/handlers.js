// import { pageNum } from '..';
import { getPicturesFromApi } from './getPicturesFromApi';
import { refs } from './refs';
let pageNum = 1;
export async function onSearch(e) {
  e.preventDefault();
  pageNum = 1;

  refs.galleryList.innerHTML = '';
  await getPicturesFromApi(refs.searchForm.elements.searchQuery.value, pageNum);
}
export async function onLoadMore() {
  pageNum++;
  await getPicturesFromApi(refs.searchForm.elements.searchQuery.value, pageNum);
}
