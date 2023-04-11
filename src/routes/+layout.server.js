import { redirect } from '@sveltejs/kit';
import { vars } from '../vars/vars.js';

/** @type {import('./$types').LayoutServerLoad} */
export function load() {
  console.log('locals.token', vars.logged);
  if ( !vars.logged ) {
    vars.logged = true;
    throw redirect(307, '/');
  }
}