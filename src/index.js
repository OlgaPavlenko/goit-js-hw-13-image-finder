import './styles.css';
import ImagesTpl from './templates/images.hbs';
import './js/apiService';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';

const debounce = require('lodash.debounce');

const refs = {
    cardContainer: document.querySelector('.gallery'),
    searchInput: document.querySelector("input[name='query']"),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]')
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const imagesApiService = new ImagesApiService();

console.log(loadMoreBtn);


refs.searchInput.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
    e.preventDefault();

    
    // const searchQuery = e.currentTarget.elements.query.value;
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
        loadMoreBtn.enable();
    }); 
}

function appendImagesMarkup(images) {
    refs.cardContainer.insertAdjacentHTML('beforeend', ImagesTpl(images));
}

function clearImagesContainer() {
    refs.cardContainer.innerHTML = '';
}

