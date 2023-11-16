import axios from 'axios';

const apiKey = '40581736-d4df81fdfae18c25a1eb903af';
const baseUrl = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: 40,
});

export async function getPicturesFromApi(query, pageNumber) {
  const response = await axios.get(
    `${baseUrl}/?key=${apiKey}&q=${query}&page=${pageNumber}&${searchParams}`
  );
  return response;
}
