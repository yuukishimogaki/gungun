import type { IncomingMessage, ServerResponse } from 'http'

export default (request: IncomingMessage, response: ServerResponse) => ({
  version: request.httpVersion,
  method: request.method,
  headers: request.headers,
  url: request.url,
  params: Object.fromEntries(new URL(request.url!, `http://${request.headers.host}`).searchParams.entries()),
  body: request.read()?.toString()
})