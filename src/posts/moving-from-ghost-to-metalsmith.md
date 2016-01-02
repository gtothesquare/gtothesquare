---
title: Moving from ghost to metalsmith
date: 2016-01-01
layout: posts.hbs
draft: true
---

##Prelude

During the past year I've been using dokku to host a couple of small sites. If you haven't heard about it before, [dokku](http://dokku.viewdocs.io/dokku/) is mini Heroku powered by Docker. Tried other solutions, like using [HAProxy and git](http://gtothesquare.com/posts/hosting-many-node-js-apps-in-one-server-with-haproxy/), however it still didn't give you the same workflow you get with `git push` deployment.

I decided that I wanted to move my blog to dokku and use the same workflow I had with the other websites. Also, I wanted a tool solution that will let me focus on writing and experimenting with the frontend of the blog without learning a theme system. So, I decided to go with a static site generator, in this case Metalsmith.


##Exporting Posts

Before I decided to use Metalsmith, my concern was how to export my posts and drafts into markdown documents. After a bit of searching i decided to use a npm package called [ghost-export](https://github.com/brianokeefe/ghost-export). 

You will need install and run the package in the ghost directory and then transfer the documents to your local computer using scp.

##Static Site Generation

If you check the site [StaticGen](https://www.staticgen.com/) you will find a plethora of tools written in Ruby, JavaScript, Go and Python. Which lead to option paralysis and at some point I just tried with the most popular one that used Node.js, that being [hexo](https://hexo.io/). 

It rapidly became apparent that hexo wasn't what I needed since it didn't give me the control I was craving, since it had already had a plugin and theme system as well as commands for publishing. So, I decided to move on.

After some more research I decided to give metalsmith a try. 

##Metalsmith

When you visit [Metalsmith's site](http://www.metalsmith.io/)  the first thing that strikes you is how minimal the tool itself is but can be a bit confusion with the lack of proper documentation. However, if you see metalsmith like a task runner gulp, then with that mental model you can start to figure out how to build a blog. it requires a lot of reading and searching in the list of plugins.   

It can get confusing 

