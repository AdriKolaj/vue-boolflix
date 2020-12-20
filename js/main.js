var app = new Vue ({


  el: '#root',

  data: {
    searchNew: '',
    searchedFilm: [],
  },

  // methods: {
  //   goOnSearch: function() {
  //     return this.searchNew
  //   }
  // },

  methods: {
    goOnSearch() {



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
      }
    },


})
