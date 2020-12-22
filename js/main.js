var app = new Vue ({


  el: '#root',

  data: {
    searchNew: '',
    searchedFilm: [],
    onlyFilms: [],
    onlySeries: [],
    flags: ['it', 'en', 'de'],
    genres: [],
  },

  methods: {
    goOnSearch() {
      if(this.searchNew != '') {
        // Ricerca dei film
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: '93b4dae4e614249a3c440ffbcd0c00e1',
            language: 'it-IT',
            query: this.searchNew,
          }
        })
        .then((response) => {
          this.onlyFilms = response.data.results;
        });
        // Ricerca serie tv
        axios.get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: '93b4dae4e614249a3c440ffbcd0c00e1',
            language: 'it-IT',
            query: this.searchNew,
          }
        })
        .then((result) => {
          this.onlySeries = result.data.results;
          this.searchedFilm = this.onlyFilms.concat(this.onlySeries);

        });
        // ricerca generi da API
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=93b4dae4e614249a3c440ffbcd0c00e1&language=it-IT")
        .then((genreResult) => {
          this.genres = genreResult.data.genres
        });
      }
    },

    getStars(vote) {
      return Math.ceil(vote / 2);
    },

    // Associazione dei generi da API a film
    findGenre(index) {
      let ids = this.searchedFilm[index].genre_ids
      let genreFound = []
      this.genres.forEach((item, i) => {
        if(ids.includes(item.id)) {
          genreFound.push(item.name)
        }
      });
      return genreFound
    },

  },

})
