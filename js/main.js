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

        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=93b4dae4e614249a3c440ffbcd0c00e1&language=it-IT")
        .then((genreResult) => {
          console.log(genreResult);
          this.genres = genreResult.data.genres
        });
      }
    },

    getStars(vote) {
      return Math.ceil(vote / 2);
    },

    // Qui ho gli id genere per ogni film
    findGenre(index) {
      let ids = this.searchedFilm[index].genre_ids
      this.genres.forEach((item, i) => {
        if(item.id == ids) {
          console.log(item.name)
          genreFound = item.name
          console.log(genreFound)
        }
      });
    },

  },

})
