/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // console.log(event.request.body);
  const response = await resolve(event);
  if (event.url.pathname.startsWith('/custom')) {
    return new Response('custom response');
  }

  // Apply CORS header for API routes
  if (event.url.pathname.startsWith('/api')) {
    // Required for CORS to work
    if (event.request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    response.headers.append('Access-Control-Allow-Origin', `*`);
  }

  return response;
}
