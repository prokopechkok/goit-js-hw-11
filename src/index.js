import { onSearch } from './js/handlers';
import { refs } from './js/refs';

refs.loadMoreBtn.hidden = true;
refs.searchForm.addEventListener('submit', onSearch);
