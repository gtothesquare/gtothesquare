---
title: Hosting many node js apps in one server with haproxy
date: 2014-02-03
layout: posts.hbs
---

## The Teaser

HAProxy (short for Hight Availability Proxy) is a proxy solution used for distributing workloads across different nodes (e.g. web servers, databases, clusters). Given that it can make decisions based on content in requests headers, we will be able to direct them depending on domain. 

To proxy traffic we will be using Access Control Lists. You can read more about it below, but to give you a "get dirty" example, which is defined in the `frontend` section of your config file: 

`acl host_cool_app hdr_dom(host) -i coolapp.com`

This will catch all requests for `coolapp.com`

Then you tell HAproxy which backend to use:

`use_backend coolapp_cluster if host_cool_app`

So then your backend will look for something like this:

```

backend coolapp_cluster
        server node1 192.168.0.1:9991


```

So, the complete `/etc/haproxy/haproxy.cfg` for your node.js coolapp will look like this:


```

global
        log 127.0.0.1 local0 notice
        daemon
        maxconn 4096
        user haproxy
        group haproxy

defaults
        log global
        mode http
        retries 3
        timeout connect 5000ms
        timeout client 10000ms
        timeout server 10000ms
        stats enable
        stats auth [YOUR_USERNAME:[YOURPASSWORD]
        stats uri /[SOME_PATH]

frontend http-in
        bind [YOUR_PUBLIC_IP]

        acl host_cool_app hdr_dom(host) -i coolapp.com
     
        use_backend coolapp_cluster if host_cool_app

backend coolapp_cluster
        server node1 192.168.0.1:9991 
        
```

If you want to know more details and how some stuff works with HAproxy, you can continue reading. Please note that this was tested in Linode with ubuntu 12.04 LTS, however you should have no problems implementing this in your own setup.

## Motivation

Wanted something less monolothic than Appache and didn't want to deal with its modules. So, I found this as the most interesting alternative, if you want to run different node.js apps at the same time. Plus it gave me oppportunity to learn something new. 

By the way, there are other ways to solve this, you can just host it in your favorite webops provider or [use apache](http://stackoverflow.com/questions/14259321/apache-node-js-mod-proxy-how-to-route-one-domain-to-3000-and-another-to-8).
  

## Prerequisites

You will need the following:

* HAProxy: You can follow this [community guide at Digital Ocean](https://www.digitalocean.com/community/articles/how-to-use-haproxy-to-set-up-http-load-balancing-on-an-ubuntu-vps) on how to install it.

* node.js and there is your [node.js install guide from Joynet](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).


## The Configuration

To make HAProxy proxy routes by domain, we can will use Access Control Lists. From the HAProxy docs: 

>ACL provids a flexible solution to perform
content switching and generally to take decisions based on content extracted
from the request...

The usage is:

```
acl <aclname> <criterion> [flags] [operator] <value>

```

The `criterion` we are using for getting the domain name of the headers is `hdr_dom`, which does the following: 

> Returns true when one of the headers contains one of the strings either
  isolated or delimited by dots.
  

  
### Configuration file

Below is the full blown `haproxy.cfg` file, in case you just want to copy paste. Regarding global and defaults, I will not explain much about them, but you should tweak them based on your needs. You can check what the do and how they can help you in the [HAProxy docs](http://cbonte.github.io/haproxy-dconv/configuration-1.4.html).


```

global
        log 127.0.0.1 local0 notice
        daemon
        maxconn 4096
        user haproxy
        group haproxy

defaults
        log global
        mode http
        retries 3
        timeout connect 5000ms
        timeout client 10000ms
        timeout server 10000ms
        stats enable
        stats auth [YOUR_USERNAME:[YOURPASSWORD]
        stats uri /[SOME_PATH]
        

frontend http-in
        bind [YOUR_PUBLIC_IP]

        acl host_cool_app hdr_dom(host) -i coolapp.com
        acl host_super_app hdr_dom(host) -i superapp.com
        acl host_website hdr_dom(host) -i aboutme.com
        acl host_coolsite hdr_dom(host) -i myname.com

        use_backend coolapp_cluster if host_cool_app
        use_backend superapp_cluster if host_super_app
        use_backend website_cluster if host_website
        use_backend website_cluster if host_coolsite

backend coolapp_cluster
        server node1 192.168.0.1:9991 

backend superapp_cluster
        server node2 192.168.0.1:9992

backend website_cluster
        server node3 192.168.0.1:9993
        
```

The config of the frontend and backend is what interests us, if your wondering what the user and password stuff is, well it defines if you want HAproxy stats in a web interface with Basic HTTP Authentication.  


Now lets continue with the frontend config. You will need to set `bind` to your public IP of our server where you will host your apps. Then we will need one `acl` line per domain as shown below. For example to route the domain `coolapp.com` to its corresponding node.js app, we will use the following line: 

`acl host_cool_app hdr_dom(host) -i coolapp.com`

The `-i` is used to igonre case of this `acl`. So, this will catch all requests for `coolapp.com`. Then you want to tell HAproxy which backend to use, and you do it with this line:

`use_backend coolapp_cluster if host_cool_app`

So then your backend will look for something like this:

```

backend coolapp_cluster
        server node1 192.168.0.1:9991


```  

Below you can see a example of how it works if you want to host more than one node.js app. Also, observe that the  ` acls host_website and host_coolsite` are proxied to the  `website_cluster`. This way can proxy the request of different domains to the same site. E.g. in case you still trying to figure out what to do with your other domains, you can just host a parking page and earn some good stuff via ads ;).


```

frontend http-in
        bind [YOUR_PUBLIC_IP]

        acl host_cool_app hdr_dom(host) -i coolapp.com
        acl host_super_app hdr_dom(host) -i superapp.com
        acl host_website hdr_dom(host) -i aboutme.com
        acl host_coolsite hdr_dom(host) -i myname.com

        use_backend coolapp_cluster if host_cool_app
        use_backend superapp_cluster if host_super_app
        use_backend website_cluster if host_website
        use_backend website_cluster if host_coolsite

backend coolapp_cluster
        server node1 192.168.0.1:9991 

backend superapp_cluster
        server node2 192.168.0.1:9992

backend website_cluster
        server node3 192.168.0.1:9993

```        

On a final note, there is a big gotcha in the `backend` configuration that had me scratching my head on why it wasn't working: you need to use different name for the server. I copied past the config for one backend and just changed the port, but forgot to change the server name from `node`. So, this is bad:

```
backend coolapp_cluster
        server node 192.168.0.1:9991 

backend superapp_cluster
        server node 192.168.0.1:9992

backend website_cluster
        server node 192.168.0.1:9993

``` 
This is good:

```
backend coolapp_cluster
        server node1 192.168.0.1:9991 

backend superapp_cluster
        server node2 192.168.0.1:9992

backend website_cluster
        server node3 192.168.0.1:9993

```
