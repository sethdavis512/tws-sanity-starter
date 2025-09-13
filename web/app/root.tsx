import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteLoaderData
} from 'react-router';
import { previewContext } from '~/sanity/preview';
import { SanityVisualEditing } from '~/components/SanityVisualEditing';

import type { Route } from './+types/root';

import './app.css';

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous'
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
    }
];

export async function loader({ request }: Route.LoaderArgs) {
    const { preview } = await previewContext(request.headers);

    const ENV = {
        VITE_SANITY_PROJECT_ID: import.meta.env.VITE_SANITY_PROJECT_ID,
        VITE_SANITY_DATASET: import.meta.env.VITE_SANITY_DATASET,
        VITE_SANITY_STUDIO_URL: import.meta.env.VITE_SANITY_STUDIO_URL
    };

    return { preview, ENV };
}

export function Layout({ children }: { children: React.ReactNode }) {
    const { preview, ENV } = useRouteLoaderData('root');

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                {preview && <SanityVisualEditing />}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(ENV)}`
                    }}
                />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details =
            error.status === 404
                ? 'The requested page could not be found.'
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
