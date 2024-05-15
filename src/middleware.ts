import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { rootRoute } from './routes';

const isProtectedRoute = createRouteMatcher(['/boards(.*)']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  const isRootRoute = req.nextUrl.pathname === rootRoute;

  // if (isRootRoute) {
  //   return Response.redirect(new URL('/boards', req.nextUrl));
  // }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
