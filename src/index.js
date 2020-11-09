import './styles.css';
import ImagesTpl from './templates/images.hbs';
import './js/apiService';
import ImagesApiService from './js/apiService';

const debounce = require('lodash.debounce');

const refs = {
    cardContainer: document.querySelector('.gallery'),
    searchInput: document.querySelector("input[name='query']"),
    loadMoreBtn: document.querySelector('[data-action="load-more"')
};

const imagesApiService = new ImagesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    
    // const searchQuery = e.currentTarget.elements.query.value;
    imagesApiService.query = refs.searchInput.value;
    imagesApiService.resetPage();
    imagesApiService.fetchArticles().then(images => {
        clearImagesContainer();
        appendImagesMarkup(images);
    });
}

function onLoadMore() {
    imagesApiService.fetchArticles().then(appendImagesMarkup);
}

function appendImagesMarkup(images) {
    refs.cardContainer.insertAdjacentHTML('beforeend', ImagesTpl(images));
}

function clearImagesContainer() {
    refs.cardContainer.innerHTML = '';
}

