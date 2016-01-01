var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
//var handlebars = require('handlebars');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var excerpts = require('metalsmith-excerpts');
var registerHelpers = require('metalsmith-register-helpers');


Metalsmith(__dirname)
  .destination('./public')
  .use(registerHelpers({
    'directory':'views/helpers/'
  }))
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
    },
    posts: {
     pattern: 'posts/*.md',
     sortBy: 'date',
     reverse: true
    }
  }))
  .use(markdown({
    'smartypants': true,
    'smartLists': true,
    'gfm': true,
    'tables': true
  }))
  .use(excerpts())
  .use(permalinks({
    pattern: ':collections/:title'
  }))
  .use(layouts({
    'engine': 'handlebars',
    'directory': 'views',
    'partials': 'views/partials'


  }))

  .build(function(err) {
    if (err) throw err;
  });