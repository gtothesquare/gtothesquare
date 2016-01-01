---
title: Regex for finding query param in url
date: 2014-05-30
layout: posts.hbs
---

**Note To Self**: a JavaScript function for getting a value of a specific query param of an URL.

```
function getQueryParam (qpn, url) {
    // qpn is short for queryParamName :)
    var paramRegEx = new RegExp(qpn+'=[^&]*'),
        testResult = paramRegEx.exec(url);
    
    // if there are many with same name, 
    // then we return the first
    if (testResult && testResult.length > 0) {
        return testResult[0].split('=')[1];
    }
    
    return null;
}
```

Here is an exmaple jsfiddle of how to use it.
<iframe width="100%" height="300" src="http://jsfiddle.net/gtothesquare/zkL6T/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>