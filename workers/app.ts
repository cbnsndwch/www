import {
    createContext,
    createRequestHandler,
    RouterContextProvider
} from 'react-router';

export type CloudflareBindings = {
    env: Env;
    ctx: ExecutionContext;
};

/**
 * Cloudflare's `env` and `ctx`, reachable from any loader, action or
 * middleware via `context.get(cloudflareContext)`.
 *
 * React Router 8 requires the adapter to hand `handleRequest` a
 * `RouterContextProvider` rather than the plain object v7 accepted.
 */
export const cloudflareContext = createContext<CloudflareBindings>();

const requestHandler = createRequestHandler(
    () => import('virtual:react-router/server-build'),
    import.meta.env.MODE
);

export default {
    fetch(request, env, ctx) {
        const context = new RouterContextProvider();
        context.set(cloudflareContext, { env, ctx });

        return requestHandler(request, context);
    }
} satisfies ExportedHandler<Env>;
