import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.target.elements.searchQuery.value.trim();

  if (!currentQuery) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    if (totalHits <= 15) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
    
  } catch (error) {
    iziToast.error({ message: 'Something went wrong!' });
  } finally {
    hideLoader();
  }
});

// 1. Добавляем слушатель событий на кнопку "Load more"
loadMoreBtn.addEventListener('click', async () => {
  page += 1; // Увеличиваем номер страницы для следующего запроса
  
  hideLoadMoreButton(); // Скрываем кнопку, пока идет загрузка
  showLoader(); // Показываем индикатор загрузки

  try {
    // 2. Делаем запрос за следующей порцией картинок
    const data = await getImagesByQuery(currentQuery, page);
    
    // 3. Отрисовываем новые картинки (createGallery использует insertAdjacentHTML)
    createGallery(data.hits);

    // 4. Проверяем, нужно ли показывать кнопку снова
    const totalPages = Math.ceil(data.totalHits / 15); // per_page у вас 15
    
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    // 5. Плавная прокрутка страницы вниз
    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const { height: cardHeight } = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

  } catch (error) {
    iziToast.error({ message: 'Something went wrong!' });
  } finally {
    hideLoader();
  }
});