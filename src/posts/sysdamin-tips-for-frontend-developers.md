---
title: Sysadmin tips for frontend developers
date: 2016-02-07
layout: posts.hbs
---


Until recently I had the problem that I will forget to get for updates on my VPS running ubuntu. 
I will even lag behind in my dokku upgrade and miss important updates and features. So, I was 
super excited to hear from the people at work about a package called `unattended updates`. 
This package automatically checks for updates and depending on how you configure it you can
either reboot your server automatically at some time or get an email.

Here you will find a [community guide](https://help.ubuntu.com/community/AutomaticSecurityUpdates#Using_the_.22unattended-upgrades.22_package) 
on how to install it.

In the section configuration section of the guide, I chose to uncomment the following:

```
"${distro_id}:${distro_codename}-security";
"${distro_id}:${distro_codename}-updates";
```

This way the we will get notifications for security updates and normal updates 
(I want my dokku to be updated to the latest). Somoe config options bellow you
will find `Unattended-Upgrade::Mail`. There you write your email to where you want
your notifications. However, this will not work if you don't have your server configure
for this. And guess what, 
[here is another guide](http://rianjs.net/2013/08/send-email-from-linux-server-using-gmail-and-ubuntu-two-factor-authentication) to help you with that :)

You will need a email account that can send mails, you should create a new one for this since
you will need to write your password in plain text in the config file.

However, other than that all should work and you should get notifications of upgraded packages
and that need to reboot. This way you can chose when to reboot the your server.

