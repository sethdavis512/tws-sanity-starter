import {
    type RouteConfig,
    index,
    prefix,
    route
} from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route(':slug', 'routes/post.tsx'),
    ...prefix('api', [
        ...prefix('preview-mode', [
            route('enable', 'routes/api/preview-mode/enable.ts'),
            route('disable', 'routes/api/preview-mode/disable.ts')
        ])
    ])
] satisfies RouteConfig;
