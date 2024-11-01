import { type NextRequest, NextResponse } from 'next/server';

import PROTECTED_ROUTES from './constant/protectedRoutes';
import { PermissionType } from './lib/types/permission.type';
import { decryptData } from './lib/utils/encrypt';

const matchRoute = (currentPathname: string) => {
  return PROTECTED_ROUTES.find((route) => {
    // Replace dynamic segments like ':uuid' with a regex pattern to match alphanumeric strings
    const regexPattern = route.pathname
      .replace(/:[a-zA-Z]+/g, '[a-zA-Z0-9-]+') // Replace :param with a regex for alphanumeric or hyphen
      .replace(/\*/g, '.*'); // Replace wildcards (*) with '.*' to match any characters

    const routeRegex = new RegExp(`^${regexPattern}$`);

    return routeRegex.test(currentPathname);
  });
};

// eslint-disable-next-line consistent-return
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;

  const permissions = decryptData(
    request.cookies.get('permissions')?.value || '',
  ) as PermissionType[];

  // regex for path ended with .png | .svg | .jpg | .jpeg
  if (/\/([^/]+\.(png|svg|jpeg|jpg|mp3|xlsx))$/.test(pathname)) {
    return NextResponse.next();
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }

  if ((pathname === '/' || pathname.startsWith('/dashboard')) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }

  const matchedRoute = matchRoute(pathname);
  if (permissions && matchedRoute) {
    const mod = permissions.find((module) => module.mod_name === matchedRoute.permission_module);

    if (!mod?.permission?.some((d) => d[matchedRoute.permission_action])) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
