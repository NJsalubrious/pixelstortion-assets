# Cloudflare configuration after deploy

This file is a cheatsheet for the Cloudflare Dashboard work needed once the
override of pixelstortion-assets is pushed. Not consumed by the site itself.

## 1. Purge cache

After force-pushing the new build, the existing Cloudflare edge cache will
still be serving the old HTML, OG cards, sitemap, manifest, and llms.txt.

Dashboard path: **Caching** > **Configuration** > **Purge Everything**

Without this, social link previews and AI crawlers may continue serving
stale data for hours.

## 2. www to apex redirect (one-time setup)

If `www.pixelstortion.com` resolves at all, set up a 301 redirect so it
consolidates to the apex form. This prevents duplicate indexing.

Dashboard path: **Rules** > **Redirect Rules** > **Create rule**

```
When incoming requests match...
  Hostname  equals  www.pixelstortion.com

Then...
  Type: Dynamic
  Expression: concat("https://pixelstortion.com", http.request.uri.path)
  Status code: 301
```

## 3. Legacy /zones/* redirects (optional but recommended)

Anywhere old Instagram bio links, Twitter posts, archived shares, etc. point
at the removed `/zones/*` paths, those will 404 after deploy. To preserve
inbound traffic, add these redirect rules:

Dashboard path: **Rules** > **Redirect Rules** > **Create rule**

### /zones/silence to silenceisthetrauma.com

```
When incoming requests match...
  URI Path  starts with  /zones/silence

Then...
  Type: Static
  URL: https://silenceisthetrauma.com/
  Status code: 301
  Preserve query string: no
```

### /zones/mataala to pixelstortion.com root

```
URI Path  starts with  /zones/mataala
->
URL: https://pixelstortion.com/
Status: 301
```

### /zones/ethel_gallery to SITT gallery

```
URI Path  starts with  /zones/ethel_gallery
->
URL: https://silenceisthetrauma.com/zones/ethel_gallery/
Status: 301
```

### /zones/silentcinema to SITT silent cinema

```
URI Path  starts with  /zones/silentcinema
->
URL: https://silenceisthetrauma.com/zones/silentcinema/
Status: 301
```

### /zones/games to SITT games

```
URI Path  starts with  /zones/games
->
URL: https://silenceisthetrauma.com/zones/games/
Status: 301
```

### Catch-all for any other /zones/* (optional)

```
URI Path  starts with  /zones/
->
URL: https://pixelstortion.com/
Status: 301
```

## 4. Verify after configuration

Visit these and confirm the expected destination:

- https://www.pixelstortion.com/        -> redirects to https://pixelstortion.com/
- https://pixelstortion.com/zones/mataala/  -> redirects to https://pixelstortion.com/
- https://pixelstortion.com/zones/silence/  -> redirects to https://silenceisthetrauma.com/
- https://pixelstortion.com/zones/ethel_gallery/  -> redirects to silenceisthetrauma.com gallery
