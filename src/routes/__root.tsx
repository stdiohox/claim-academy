import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  HeadContent,
  createRootRoute,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { reportLovableError } from "../lib/lovable-error-reporting";

const queryClient = new QueryClient();

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-content-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    scripts: [
      {
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1407484639676240');`,
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://connect.facebook.net' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function useMetaPixelPageView() {
  const router = useRouter();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Fire PageView on the initial load for the first route rendered.
    const firePageView = (pathname: string) => {
      if (pathname === lastPath.current) return;
      lastPath.current = pathname;
      const fbq = (window as any).fbq;
      if (typeof fbq === 'function') {
        fbq('track', 'PageView');
      }
    };

    // Fire for the current location immediately (covers direct loads).
    firePageView(router.state.location.pathname);

    // Subscribe to future navigations — fires after each resolved route change.
    const unsub = router.subscribe('onResolved', ({ toLocation }) => {
      firePageView(toLocation.pathname);
    });

    return unsub;
  }, [router]);
}

function RootComponent() {
  useMetaPixelPageView();
  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <Outlet />
    </QueryClientProvider>
  );
}
