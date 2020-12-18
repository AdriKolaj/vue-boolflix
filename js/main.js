var app = new Vue ({


  el: '#root',
  data: {
    searchedFilm: [],
  },
  mounted: function() {
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: '93b4dae4e614249a3c440ffbcd0c00e1',
        language: 'it-IT',
        query: 'ritorno-al-futuro'
      }
    })
      .then((response) => {
        // console.log(response.data.adult);
        this.searchedFilm = response.data.results;
        console.log(this.searchedFilm)
      });
  }


})
