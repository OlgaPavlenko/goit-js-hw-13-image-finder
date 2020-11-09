const API_KEY = '19023232-35be833f55f428d8b0eb36710';
const BASE_URL = "https://pixabay.com/api/";
const options = {
    Authorization: API_KEY,
};

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        console.log(this);
        
        
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${options.Authorization}`;
        
       return fetch(url).then(response => response.json()).then(({ hits }) => {
            this.incrementPage(); 

           return hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() { 
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
}

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}