import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  
  if (process.env.CODE_ENV === 'test') {
    console.log('API routes are disabled for this environment');
    
    // return NextResponse.error(new Error('API routes are disabled for this environment'));
    if (request.url.includes('/api')) {
      return NextResponse.json({ error: 'API routes are disabled for this environment' }, { status: 403 });
    }
  }

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  });
}