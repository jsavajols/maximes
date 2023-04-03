/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // console.log(event.request.body);
  const response = await resolve(event);
  if (event.url.pathname.startsWith('/custom')) {
    return new Response('custom response');
  }


  return response;
}
