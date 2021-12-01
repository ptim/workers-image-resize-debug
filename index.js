/*
> The script preview of the Worker editor ignores fetch() options, and will always fetch unresized images. To see the effect of Image Resizing you must deploy the Worker script and use it outside of the editor.

https://developers.cloudflare.com/images/image-resizing/resize-with-workers#lack-of-preview-in-the-dashboard
*/
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

const IMAGE_RESIZE_REFERENCE = 'https://i.imgur.com/4fB2R0Q.jpg'

/**
 * Minimal handler based on:
 * https://developers.cloudflare.com/images/image-resizing/resize-with-workers#an-example-worker
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  // If this request is coming from image resizing worker,
  // avoid causing an infinite loop by resizing it again:
  if (/image-resizing/.test(request.headers.get('via') || '')) {
    return fetch(request)
  }

  /**
   * @type {RequestInitCfProperties}
   * https://github.com/cloudflare/workers-types
   */
  const cf = {
    image: {
      width: 1200,
      height: 800,
      quality: 90,
      fit: 'crop',
    },
    // don't cache this debug route
    cacheTtl: 0,
  }

  const { searchParams } = new URL(request.url)

  const hasFormat = searchParams.has('format')
  if (hasFormat) cf.image.format = searchParams.get('format') || 'json'

  const hasTrim = searchParams.has('trim')
  if (hasTrim) cf.image.trim = { left: 360, top: 140, right: 1560, bottom: 940 }

  console.log(cf, { hasFormat, hasTrim })

  // Build a request that passes through request headers
  const imageRequest = new Request(IMAGE_RESIZE_REFERENCE, {
    headers: request.headers,
  })

  // Returning fetch() with resizing options will pass through response with the resized image.
  return fetch(imageRequest, { cf })
}
