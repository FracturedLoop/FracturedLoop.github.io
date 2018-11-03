---
title: 'Preloading fonts to alleviate FOUC'
path: '/posts/faster-font-loading-less-flash'
date: '2018-11-02T20:28:18Z'
tags:
  - quick tip
  - performance
---

We've all been there. That moment when you are on a slow connection and ever so slowly a page's content loads. One. thing. at. a. time. Then you can see everything but the text for a brief moment before _BAM!_ The font loads and everything goes blank while it is getting rerendered. As a user, it is jarring, and as developers, it's a pain to deal with. What if there was a simple solution? Good news! There is. It's not a cure all, but it can at least help alleviate the pain of the dreaded flash of unstyled content (FOUC). It comes in the form of [`rel="preload"`](https://w3c.github.io/preload/). Let's take a look at how easy it is to use.

```html
<head>
<!-- Other head stuff -->

<!-- Tell the browser we want to preload the font -->
<link rel="preload" as="font" href="/assets/fonts/demofont.woff2">

<!-- Actually use the font -->
<style>
  @font-face {
    font-family: 'Demo Font';
    src: local('Demo Font'),
      url('/assets/fonts/demofont.woff2') format('woff2'), /* all browsers that support preload also support woff2 */
      /* Include other fallbacks as usual */
    }
</style>

</head>
```

Thats it. The preload link causes the browser to fire off a high-priority request to whatever asset you tell it to load. Since the request is higher priority, it will complete sooner and, as a result, the font is more likely to arrive before all the rendering happens. Do note that this isn't a cure-all though. You don't want to preload assets that you won't use for certain, as you'll be firing off network requests that may never be used. Also, preloading too many assets will essentially undo the affect of the preloading, since the preloaded assets will all have their priority increased similarly.

Fonts aren't the only thing that can be preloaded. The [spec](https://w3c.github.io/preload/) allows just about any asset to be preloaded. This enables us to preload stylesheets, javascript, images, videos, etc. This also allows us to preload Google Fonts rather trivially:

<a id="google-fonts-example"></a>

```html
<head>
  <!-- Preload the font -->
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Roboto">
  <!-- Include the font's stylesheet -->
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</head>
```

For a more thorough interview, take a look at the [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) docs, or, if you are more interested in how this applies to fonts in particular, take a look at Google's _excellent_ document on [web font optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization).

**TLDR:** For Google fonts, put `<link rel="preload" as="style" href="[google font url here]">` in the header. For more details, see [above](#google-fonts-example).
