var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var excerpts = require('metalsmith-excerpts');
var registerHelpers = require('metalsmith-register-helpers');
var drafts = require('metalsmith-drafts');

//will convert everything in the folder
// __dirname/src with md extension to html and copy the rest
Metalsmith(__dirname)
  //where the static files will be generated
  .destination('./public')
  .use(drafts())
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
  //plugin for generating the html from markdown.
  .use(markdown({
    'smartypants': true,
    'smartLists': true,
    'gfm': true,
    'tables': true
  }))
  //plugin to generate experts of each post
  .use(excerpts())
  .use(permalinks({
    pattern: ':collections/:title'
  }))
  //templating plugin
  .use(layouts({
    'engine': 'handlebars',
    'directory': 'views',
    'partials': 'views/partials'
  }))
  //build command
  .build(function(err) {
    if (err) throw err;
  });