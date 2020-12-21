var app = new Vue ({


  el: '#root',

  data: {
    searchNew: '',
    searchedFilm: [],
    flags: ['it', 'en', 'de']
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
          this.searchedFilm = response.data.results;
        });

        axios.get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: '93b4dae4e614249a3c440ffbcd0c00e1',
            language: 'it-IT',
            query: this.searchNew,
          }
        })
        .then((response) => {
          this.searchedFilm = response.data.results;
        });
      }
    },
    getStars(vote) {
      return Math.ceil(vote / 2);
    }
  },


})
