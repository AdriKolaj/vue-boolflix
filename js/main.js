var app = new Vue ({


  el: '#root',

  data: {
    myApi: '93b4dae4e614249a3c440ffbcd0c00e1',
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
            api_key: this.myApi,
            language: 'it-IT',
            query: this.searchNew,
          }
        })
        .then((response) => {
          this.onlyFilms = response.data.results;
          self.$forceUpdate();
        });
        // Ricerca serie tv
        axios.get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: this.myApi,
            language: 'it-IT',
            query: this.searchNew,
          }
        })
        .then((result) => {
          if(result.status === 200) {
            this.onlySeries = result.data.results;
            this.searchedFilm = this.onlyFilms.concat(this.onlySeries);
          }
          self.$forceUpdate();
        });

        const self = this;
        // ricerca attori da API
        for (let i = 0; i < self.searchedFilm.length; i++) {
          let currentId = self.searchedFilm[i].id;
          const currentFilm = self.searchedFilm[i];
          currentFilm.cast = [];

          axios.get('https://api.themoviedb.org/3/movie/'+ currentId +'/credits', {
            params: {
              api_key: this.myApi,
            }
          })
          .then((actorsResult) => {
            if(actorsResult.status === 200) {
              for (var j = 0; j < actorsResult.data.cast.length; j++) {
                if(currentFilm.cast.length < 5) {
                  currentFilm.cast.push(actorsResult.data.cast[j].name);
                }
              }
            }
            self.$forceUpdate();
          });
        }

        // ricerca generi da API
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=93b4dae4e614249a3c440ffbcd0c00e1&language=it-IT")
        .then((genreResult) => {
          if(genreResult.status === 200) {
            this.genres = genreResult.data.genres
          }
        });
      }
    },

    // Assegnazione voto film con le stelle
    getStars(vote) {
      return Math.ceil(vote / 2);
    },

    // Associazione dei generi da API a film
    findGenre(index) {
      let ids = this.searchedFilm[index].genre_ids;
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
