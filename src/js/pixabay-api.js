import axios from 'axios';

export default function fetchingGallery() {
  let nextPageNumber = 1;
  const hitsPerPage = 16;

  async function fetchingGalleryPage(userRequest) {
    const searchParams = new URLSearchParams({
      key: '50846905-dc608c04a9f845ecec04912aa',
      q: userRequest,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: nextPageNumber,
      per_page: hitsPerPage,
    });

    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );

    nextPageNumber++;

    const { hits, totalHits } = response.data;

    const pageLimit = Math.ceil(totalHits / hitsPerPage);
    const isLastPage = nextPageNumber > pageLimit;

    return { hits, isLastPage };
  }

  function resetNextPageNum() {
    nextPageNumber = 1;
  }

  return { fetchingGalleryPage, resetNextPageNum };
}