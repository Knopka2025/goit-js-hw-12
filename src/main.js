import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchingGallery from './js/pixabay-api';
import renderGallery from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('button[data-load]');

const { fetchingGalleryPage, resetNextPageNum } = fetchingGallery();
let userRequest = '';

const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 150,
});

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  userRequest = event.target.elements.requestValue.value.trim();

  if (!userRequest) {
    return;
  }

  resetNextPageNum();
  clearGallery();
  showLoader(searchForm);
  hideLoadMoreBtn();

  try {
    const { hits: firstPage, isLastPage } = await fetchingGalleryPage(
      userRequest
    );

    if (!firstPage.length) {
      iziToast.error({
        message:
          'Вибачте, наразі немає зображень, що відповідають Вашому  пошуковому запиту. Спробуйте пізніше!',
        position: 'topRight',
      });

      removeLoader();

      return;
    }

    renderGallery(firstPage, galleryList);
    galleryLightbox.refresh();

    removeLoader();
    showLoadMoreBtn(isLastPage);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: 'Ой, щось пішло не так. Спробуйте пізніше!',
      position: 'topRight',
    });

    removeLoader();
  }

  searchForm.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader(galleryList);
  hideLoadMoreBtn();

  const { height: itemHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  try {
    const { hits: nextPage, isLastPage } = await fetchingGalleryPage(
      userRequest
    );

    removeLoader();

    renderGallery(nextPage, galleryList);
    galleryLightbox.refresh();

    window.scrollBy(0, itemHeight * 2);
    showLoadMoreBtn(isLastPage);
  } catch (error) {
    console.error(error);

    iziToast.error({
      message: 'Ой, щось пішло не так. Спробуйте пізніше!',
      position: 'topRight',
    });

    removeLoader();
  }
});

function showLoader(leftNeighborNode) {
  leftNeighborNode.insertAdjacentHTML(
    'afterend',
    `<span class='loader'></span>`
  );
}

function removeLoader(loaderNode = document.querySelector('.loader')) {
  if (loaderNode) {
    loaderNode.remove();
  }
}

function showLoadMoreBtn(isLastPage) {
  if (loadMoreBtn.classList.contains('visually-hidden')) {
    if (isLastPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.classList.remove('visually-hidden');
    }
  }
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('visually-hidden');
}

function clearGallery() {
  galleryList.innerHTML = '';
}
