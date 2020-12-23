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
    actorsFound: []
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
        });

        const self = this;
        // ricerca attori da API
        for (let i = 0; i < this.searchedFilm.length; i++) {
          let currentId = this.searchedFilm[i].id;
          console.log(this.searchedFilm[i].id);

          axios.get('https://api.themoviedb.org/3/movie/'+ currentId +'/credits', {
            params: {
              api_key: this.myApi,
            }
          })
          .then((actorsResult) => {
            if(actorsResult.status === 200) {
              // self.actorsFound.push(actorsResult.data.cast[0].name);
              // console.log(self.actorsFound);
              actorsResult.data.cast.forEach((item, i) => {
                if(actorsResult.data.cast.length < 5) {
                  self.actorsFound.push(actorsResult.data.cast[i].name);
                }
                console.log(self.actorsFound)
              });

            }
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

    // findId() {
    //   let movieId = 0;
    //   for (var i = 0; i < this.searchedFilm.length; i++) {
    //     movieId = this.searchedFilm[index].id;
    //   }
    //   return movieId
    //   // let movieId = this.searchedFilm[index].id;
    //   // console.log(movieId);
    //   // return movieId
    // },

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
