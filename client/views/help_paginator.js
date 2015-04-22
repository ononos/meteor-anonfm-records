
/*
 Usage:
 
   {{>paginator route="myLiked" page=1 pages=9}}

 url to page: route must have param "page"!

   Router.route('/liked/:page', {
*/

var pagination_neighborhood = 4;

Template.paginator.helpers({
  farFromStart: function() {
    return Math.max (0, +this.page - pagination_neighborhood);
  },

  farToEnd: function() {
    return this.pages - pagination_neighborhood > +this.page;
  },

  neighborhood: function() {
    var from = Math.max(0, +this.page - pagination_neighborhood),
        to = Math.min(+this.pages, +this.page + pagination_neighborhood),
        need_delta = 2 * pagination_neighborhood;

    if (to - from < need_delta) {
      if (+this.page < pagination_neighborhood) {
        to += need_delta - to;
        to = Math.min(+this.pages, to);
      }
      if (+this.page > this.pages - pagination_neighborhood) {
        from -= pagination_neighborhood - (this.pages - this.page);
        from = Math.max(0, from);
      }
    }
      

    console.log('from', from, 'to', to, '++ delta', need_delta);
    return _.range(from, to + 1);
  },
  isThisPage: function() {
    return this == Template.parentData(1).page;
  },

  lastPage: function() { return this.pages;}
});
