import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';


import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function showNoResultsToast() {
  iziToast.show({
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    backgroundColor: '#EF4040',
    messageColor: '#FAFAFB',
    iconUrl: crossIcon,
  });
  return;
}

function showEndOfResultsToast() {
  iziToast.show({
    position: 'topRight',
    backgroundColor: 'rgb(137, 207, 240, 0.8)',
    message: `We're sorry, but you've reached the end of search results.`,
    messageColor: 'black',
  });
  return;
}

function showErrorToast(error) {
  iziToast.show({
    message: `Error: ${error.message}`,
    backgroundColor: '#EF4040',
    messageColor: '#FAFAFB',
  });
}

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

let page = 1;
let input = '';
let perPage = 15;
let totalPages = 0;

async function handleSubmit(event) {
  event.preventDefault();
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();
  input = event.currentTarget.elements['search-text'].value;
  try {
    const { images, totalHits } = await getImagesByQuery(input, page);
    if (images.length === 0) {
      showNoResultsToast();
    }

    createGallery(images);
    totalPages = Math.ceil(totalHits / perPage);

    if (page < totalPages) {
      showLoadMoreButton();
    } else if (page === totalPages) {
      showEndOfResultsToast();
    }
  } catch (error) {
    showErrorToast(error);
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  page++;
  hideLoadMoreButton();
  showLoader();

  try {
    const { images } = await getImagesByQuery(input, page);
    createGallery(images);

    const firstCard = document.querySelector('.gallery li');
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page === totalPages) {
      showEndOfResultsToast();
    }

    if (page < totalPages) {
      showLoadMoreButton();
    }
  } catch (error) {
    showErrorToast(error);
  } finally {
    hideLoader();
  }
}