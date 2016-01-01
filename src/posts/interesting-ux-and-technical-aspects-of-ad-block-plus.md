---
title: Interesting ux and technical aspects of ad block plus
date: 2014-05-14
layout: posts.hbs
---

*Disclaimer: this are my own ideas and opinions and of nobody else.*

AdBlock Plus can be a [pain for advertisers and content owners](http://mashable.com/2013/10/14/twitter-adblock/), to the point that Google needed to pay to be whitelisted. What I find interestings are the negative effects it has in the UX of Firefox by affecting  [performance and memory usage](https://blog.mozilla.org/nnethercote/2014/05/14/adblock-pluss-effect-on-firefoxs-memory-usage/) and why it happens:  

* They are very aggressive. They insert a global CSS stylesheet to hide ads that can't be blocked. However, [firefox inserts this stylesheet in every iframe](https://bugzilla.mozilla.org/show_bug.cgi?id=988266), which adds around 4MB per iframe. 

* They use JavaScript objects for data storage, meaning they load their huge list of blacklist and whilelist domains in memory. The problem with using objects or arrays is the conversion of data to a native representation.

* [The Ad Block developer suggests](https://blog.mozilla.org/nnethercote/2014/05/14/adblock-pluss-effect-on-firefoxs-memory-usage/comment-page-1/#comment-11163) that the use of Typed Arrays will help, however it still going to store a lot in memory.

* There is a way to detect AdBlock plus and react to it: https://github.com/sitexw/FuckAdBlock

* There are more interesting details in their page https://adblockplus.org/en/faq_internal, which includes descriptions on how they Gecko API to include new "content policies" to block domains, how it process filters by translating them to Regular Expressions and their [filter matching algorithm](https://adblockplus.org/blog/investigating-filter-matching-algorithms), to mention a few.


##UX is what matters

At the end of the day, advertisers and content owners want to make money, while users want fast, clean and free acceess to content. So, the proper thing is just to meet in the middle:

* Brands and advertisers need create new non intrusive formats and engage with their audience.

* Content owners need to educate their visitors and consumers of digital offering, so the understand that advertisement pays the for their free content.

* If consumers and visitors don't agree with some ads, protest with your eye balls or wallets: don't consume their content. Support those that do a good job.

##Posible solutions

**Ad Policy** Use the "[EU cookie policy](http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm#section_2)" as an inspiration. As they do with cookies, where visitors need to agree to the accepting cookies to use the site, why not ask users to agree to ads, to continue consuming content. No logins, no teasers, just a small banner in the top with a why sites need to put ads.

**Flagging ads** I like to see more of a way to report when I find a ad annoying. The main reason is that some content owners use ad networks, so is very difficult for them to control what is shown. A way to flag ads, gives the site owners data on what do visitors like and don't like.

