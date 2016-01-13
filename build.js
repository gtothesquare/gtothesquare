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
  //for use of draft:true in the Yaml front matter
  .use(drafts())
  .use(registerHelpers({
    'directory':'views/helpers/'
  }))
  //This plugin is used to generate a list of posts in cronological order
  .use(collections({
    posts: {
     pattern: 'posts/*.md',
     sortBy: 'date',
     reverse: true
    }
  }))
  //plugin for generating the html from markdown.
  .use(markdown({
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