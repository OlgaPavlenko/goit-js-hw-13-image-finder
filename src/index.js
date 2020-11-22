import './styles.css';
import ImagesTpl from './templates/images.hbs';
import './js/apiService';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';

const debounce = require('lodash.debounce');

const refs = {
  cardContainer: document.querySelector('.gallery'),
  searchInput: document.querySelector("input[name='query']"),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imagesApiService = new ImagesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = refs.searchInput.value;
  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService.fetchArticles().then(images => {
    appendImagesMarkup(images);

    if (images.length < 12) {
      loadMoreBtn.hide();
    } else {
      loadMoreBtn.show();
    }

    loadMoreBtn.enable();
  });
}

function appendImagesMarkup(images) {
  refs.cardContainer.insertAdjacentHTML('beforeend', ImagesTpl(images));
}

function clearImagesContainer() {
  refs.cardContainer.innerHTML = '';
}
