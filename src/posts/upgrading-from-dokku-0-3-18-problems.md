---
title: Upgrading from dokku 03.18 problems
date: 2015-07-12
layout: posts.hbs
---

I forgot to give some proper love to my dokku installation (running in a Ubuntu Linode), which ment I was lagging behind some updates. Also, I find it sane to wait a couple updates in case a new one introduces new critical bugs :). So, there I was, a nice Sunday morning trying to upgrade, when I was met with the following error:

```
Some packages could not be installed. This may mean that you have
requested an impossible situation or if you are using the unstable
distribution that some required packages have not yet been created
or been moved out of Incoming.
The following information may help to resolve the situation:

The following packages have unmet dependencies:
 dokku : Depends: lxc-docker-1.6.2 but it is not going to be installed
E: Unable to correct problems, you have held broken packages.
root@gerul:~# apt-get install -qq -y dokku
E: Unable to correct problems, you have held broken packages.
```

The key here is `lxc-docker-1.6.2` which is needed and blocking the upgrade, due to my current version being `lxc-docker-1.6.0`. So, instead of blindly following the [dokku docs](http://progrium.viewdocs.io/dokku/upgrading) and running `apt-get install -qq -y dokku` or `apt-get install -qq -y buildstep` do the following:

```
$ apt-get install lxc-docker-1.6.2
```
Oh and is recommended that you rebuild all your apps after each upgrade:

```
$ dokku ps:rebuildall
```

Note: the rebuildall might take some time so is good to use the time to stretch or enjoy a refreshing beverage ;).