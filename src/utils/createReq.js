export default async function createReq({ query, method, content, id }) {
  const baseURL = 'https://redux-thunk-server.herokuapp.com/api/test/';
  // const baseURL = 'http://localhost:7777/';
  const requestURL = method === 'DELETE' ? `${baseURL + query}${id}` : baseURL + query;

  const request = await fetch(requestURL, {
    method,
    headers: { 'content-type': 'application/json' },
    body: content ? JSON.stringify({ id, content }) : null,
  });
  if (!request.ok) {
    throw new Error('Request error');
  }
  const response = request.status === 200 ? await request.json() : null;
  return response;
}
