import { Link } from 'react-router';
import type { Route } from './+types/home';
import { previewContext } from '~/sanity/preview';
import { loadQuery, useQuery } from '@sanity/react-loader';

type Post = {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
};

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export async function loader({ request }: Route.LoaderArgs) {
    const { options } = await previewContext(request.headers);

    return { posts: await loadQuery<Post[]>(POSTS_QUERY, {}, options) };
}

export default function IndexPage({ loaderData }: Route.ComponentProps) {
    const { data } = useQuery(POSTS_QUERY, {}, { initial: loaderData.posts });

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8">
            <h1 className="text-4xl font-bold mb-8">Posts</h1>
            <ul className="flex flex-col gap-y-4">
                {data.map((post: Post) => (
                    <li className="hover:underline" key={post._id}>
                        <Link to={`/${post.slug.current}`}>
                            <h2 className="text-xl font-semibold">
                                {post.title}
                            </h2>
                            <p>
                                {new Date(
                                    post.publishedAt
                                ).toLocaleDateString()}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
