import { onSearch } from './js/handlers';
import { refs } from './js/refs';

export let pageNum = 1;
refs.loadMoreBtn.hidden = true;

refs.searchForm.addEventListener('submit', onSearch);
