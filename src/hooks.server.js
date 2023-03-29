/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // console.log(event);
    if (event.url.pathname.startsWith('/custom')) {
      return new Response('custom response');
    }
   
    const response = await resolve(event);
    return response;
  }