import { Link } from 'react-router';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityDocument } from '@sanity/client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableText } from '@portabletext/react';
import { useQuery } from '@sanity/react-loader';

import type { Route } from '../routes/+types/post';
import { client } from '~/sanity/client';
import { previewContext } from '~/sanity/preview';
import { loadQuery } from '~/sanity/loader.server';

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export async function loader({ request, params }: Route.LoaderArgs) {
    const { options } = await previewContext(request.headers);
    return {
        post: await loadQuery<SanityDocument>(POST_QUERY, params, options),
        params
    };
}

export default function Component({ loaderData }: Route.ComponentProps) {
    const { data: post } = useQuery(POST_QUERY, loaderData.params, {
        initial: loaderData.post
    });

    const postImageUrl = post.image
        ? urlFor(post.image)?.width(550).height(310).url()
        : null;

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
            <Link to="/" className="hover:underline">
                ← Back to posts
            </Link>
            {postImageUrl && (
                <img
                    src={postImageUrl}
                    alt={post.title}
                    className="aspect-video rounded-xl"
                    width="550"
                    height="310"
                />
            )}
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
            <div className="prose">
                <p>
                    Published: {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                {Array.isArray(post.body) && <PortableText value={post.body} />}
            </div>
        </main>
    );
}
