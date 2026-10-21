import { json } from '@remix-run/cloudflare';
import { useLoaderData, useParams } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Post, postMarkdown } from '~/layouts/post';
import { baseMeta } from '~/utils/meta';
import { formatTimecode, readingTime } from '~/utils/timecode';

const modules = import.meta.glob('./articlestore/articles.*.mdx', { eager: true });
const raws = import.meta.glob('./articlestore/articles.*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function getModule(slug) {
  return modules[`./articlestore/articles.${slug}.mdx`];
}

export async function loader({ params }) {
  const key = `./articlestore/articles.${params.slug}.mdx`;
  const mod = modules[key];
  if (!mod) throw new Response('Not found', { status: 404 });

  const timecode = formatTimecode(readingTime(raws[key]));
  return json({ frontmatter: mod.frontmatter, timecode });
}

export function meta({ data }) {
  return baseMeta({
    title: data?.frontmatter?.title,
    description: data?.frontmatter?.abstract,
  });
}

export default function ArticlePage() {
  const { slug } = useParams();
  const { frontmatter, timecode } = useLoaderData();
  const Content = getModule(slug)?.default;
  if (!Content) return null;

  return (
    <MDXProvider components={postMarkdown}>
      <Post {...frontmatter} timecode={timecode}>
        <Content />
      </Post>
    </MDXProvider>
  );
}