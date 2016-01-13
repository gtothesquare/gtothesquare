---
title: Moving from ghost to metalsmith
date: 2016-01-11
layout: posts.hbs
---

## Prelude

During the past year I've been using dokku to host a couple of small sites. If you haven't heard about it before, [dokku](http://dokku.viewdocs.io/dokku/) is mini Heroku powered by Docker. I tried using [HAProxy and git](http://gtothesquare.com/posts/hosting-many-node-js-apps-in-one-server-with-haproxy/), however it still didn't give you the same workflow you get with `git push` deployment as dokku or Heroku.

After seeing the benefits, I wanted to have have everything deployed via `git push`, including my blog. Also, I wanted a solution that will let me focus on writing and experimenting with the frontend of the blog, without learning a theme system or plugin system. At the end of weighting a couple of options (including ghost with in dokku) I decided to go with a static site generator, in this case Metalsmith.


## Exporting Posts

Before I decided to use Metalsmith, my concern was how to export my posts and drafts into markdown documents. After a bit of searching I decided to use a npm package called [ghost-export](https://github.com/brianokeefe/ghost-export). 

You will need install and run the package in the ghost directory and then transfer the documents to your local computer using scp.

## Static Site Generation

If you check the site [StaticGen](https://www.staticgen.com/) you will find a plethora of tools written in Ruby, JavaScript, Go and Python. Which lead to option paralysis. When faced with such a challenge of choosing from many options, the best  strategy is to try the most popular one. I decided to try the most popular that uses Node.js, so in this case I went with [hexo](https://hexo.io/). 

It rapidly became apparent that hexo wasn't what I needed since it didn't give me the control I was craving, since it had already had a plugin and theme system as well as commands for publishing. It was basically a blogging platform, so I decided to move on.

After some more research I decided to give metalsmith a try. 

## Metalsmith

When you visit [Metalsmith's site](http://www.metalsmith.io/)  the first thing that strikes you is how minimal the tool itself is. But that same minimalism can cause confusion with the lack of proper documentation. However, if you see metalsmith like a task runner gulp, then with that mental model you can start to figure out how to build a blog. It requires a lot of reading and searching in the list of plugins.

Something that helped figure stuff out was this [blog post from evocode](http://evocode.com/blog/mastering-metalsmith-best-practices-for-static-sites/) (which includes a [starter repo](https://github.com/evocode/metalsmith-base)).

The other thing that you need to get your head around is that for each post, you need to generate metadata that metalsmith will use to generate the publish date and permalink. Since, I was moving from a markdown based blogging system (and I like markdown :) ) you will need to add this metadata to the files that we generated with [ghost-export](https://github.com/brianokeefe/ghost-export).

Here is a example:

```
---
title: Regex for finding query param in url
date: 2014-05-30
layout: posts.hbs
---
```

If I want to mark the post as draft then I do the following:

```
---
title: This is a new post
date: 2016-01-11
layout: posts.hbs
draft: true
---
```

Metalsmith will look for the posts in the `src` dir. You can configure that as you configure the destination dir (which in my case is `public`). When you use the `markdown plugin` metalsmith will look for all the `.md` files and generate the static versions of each post and will copy the rest of the assets to the destination folder. So, to make things simpler, I used Express static serving middleware and configured all urls for assets (css, scripts and images) relative to the root path and not relative to the post path.

Here is how the header looks:

```
 <link rel="stylesheet" href="/css/normalize.css">
 <link rel="stylesheet" href="/css/skeleton.css">
 <link rel="stylesheet" href="/css/app.css">

 <link rel="icon" type="image/png" href="/images/favicon.png">
```

I decided to publish my [metalsmith project in github](https://github.com/gtothesquare/gtothesquare) with the hope of helping anybody that will like to start with it and show how I structured the the project and the use of some plugins.

But like most things in our are of software developments, I have a todo list of stuff to figure out and do:

- automating new post metadata since it uses YAML Front matter for generating the title and date
- Add a comment system 
- Make it load faster
- Misc design stuff




