angular.module('app.services', [])
  .service('Services', ['$http', function($http) {
    this.getAnime = () => {
      let query = "https://kitsu.io/api/edge/anime?filter[status]=current&filter[subtype]=TV&sort=popularityRank&page[limit]=20"
      return $http.get(query)
    }
  }])