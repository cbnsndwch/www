import { data } from 'react-router';

export function meta() {
    return [{ title: 'Page not found - Sergio Leon' }];
}

export async function loader() {
    // Render through the error boundary so the response carries a real 404
    // rather than a 200 with not-found content in the body.
    throw data('Not found', { status: 404 });
}

export default function NotFoundRoute() {
    return null;
}
