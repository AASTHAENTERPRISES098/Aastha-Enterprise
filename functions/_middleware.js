// Cloudflare Pages Function — runs on every request, including *.pages.dev.
// Cloudflare's own zone-level Redirect Rules can't reach pages.dev (it's Cloudflare's
// zone, not ours), so closing it off has to happen here instead.
export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname.endsWith(".pages.dev")) {
    url.hostname = "aastha-enterprise.com";
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
