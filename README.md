# workers-image-resize-debug

A minimal example of [resizing using Cloudflare workers](https://developers.cloudflare.com/images/image-resizing/resize-with-workers).

<!-- https://developers.cloudflare.com/workers/platform/deploy-button -->
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ptim/workers-image-resize-debug)

Add `?format=json` (or `avif`, `webp`) to change the format from auto.

Add `?trim` to add a hard-coded `trim` configuration.

## Note: must be deployed to function!

> The script preview of the Worker editor ignores fetch() options, and will always fetch unresized images. To see the effect of Image Resizing you must deploy the Worker script and use it outside of the editor.

[resize-with-workers#lack-of-preview-in-the-dashboard](https://developers.cloudflare.com/images/image-resizing/resize-with-workers#lack-of-preview-in-the-dashboard)
