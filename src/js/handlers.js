import { pageNum } from '..';
import { getPicturesFromApi } from './getPicturesFromApi';
import { refs } from './refs';

export async function onSearch(e) {
  e.preventDefault();
  let newPageNumber = 1;
  refs.galleryList.innerHTML = '';
  await getPicturesFromApi(
    refs.searchForm.elements.searchQuery.value,
    newPageNumber
  );
}
export async function onLoadMore() {
  let newPageNumber = pageNum + 1;
  await getPicturesFromApi(
    refs.searchForm.elements.searchQuery.value,
    newPageNumber
  );
}
