
/*
 Usage:
 
 {{>paginator route="myLiked" page=1 pages=9 perPage=2}}

 url to page: route must have param "page"!
*/

var pagination_neighborhood = 4;

Template.paginator.helpers({
  farFromStart: function() {
    return Math.max (0, this.page - pagination_neighborhood);
  },

  farToEnd: function() {
    console.log('farToEnd', this.pages - pagination_neighborhood , this.page);
    return this.pages - pagination_neighborhood -1 > this.page;
  },

  neighborhood: function() {
    var from = Math.max(0, this.page - pagination_neighborhood),
        to = Math.min(this.pages, from + this.perPage * pagination_neighborhood + 1);

    return _.range(from, to);
  },
  isThisPage: function() {
    return this == Template.parentData(1).page;
  },

  lastPage: function() { return this.pages - 1;}
});
