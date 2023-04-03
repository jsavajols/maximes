export const handle = async({event, resolve}) => {
  const requestedPath = event.url.pathname;
  
  // Auth check will go here

  const response = await resolve(event);

  return response;
}