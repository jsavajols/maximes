import { GET } from '../src/routes/api/authors/+server.js';
import { POST } from '../src/routes/api/authors/+server.js';
import { PUT } from '../src/routes/api/authors/+server.js';
import { DELETE } from '../src/routes/api/authors/[id]/+server.js';




let result;

result = await GET();

// result = await POST({ request: { author: "02auteur++" } });

// result = await PUT({ request: { Id:176 , author: "02auteur" } });

// result = await DELETE({ params: { id:178 } });

const json = await result.json();
console.log(json);

