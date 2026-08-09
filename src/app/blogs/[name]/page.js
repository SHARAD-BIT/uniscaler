import BlogsContent from "@/Components/BlogsContent";
import { firstFromJsonArray, getBlogByTimestamp } from "@/lib/api";
import { pageMetadata, toDescription } from "@/lib/seo";

/**
 * Blog URLs are /blogs/<timeStamp> — see the navigate.push in Blogs.jsx — so
 * the post is resolvable from the URL alone, server-side, before any HTML goes
 * out. The component itself still looks the post up by in-memory nav state; the
 * metadata here does not depend on that.
 */
export async function generateMetadata({ params }) {
  const { name } = await params;
  const blog = await getBlogByTimestamp(name);

  if (!blog) {
    // The post could not be resolved (unknown timestamp, or the backend was
    // unreachable). Better a generic title than one asserting a post exists.
    return pageMetadata({
      title: "Blog",
      description:
        "Admission news, exam updates, course guides and career advice for Indian students from the Uniscaler counselling team.",
      path: `/blogs/${name}`,
      noIndex: true,
    });
  }

  const image = firstFromJsonArray(blog.image);
  const description =
    toDescription(firstFromJsonArray(blog.description)) ||
    `Read "${blog.title}" on the Uniscaler education blog.`;

  return pageMetadata({
    title: blog.title,
    description,
    path: `/blogs/${name}`,
    type: "article",
    ...(image
      ? { image: `${process.env.NEXT_PUBLIC_BLOG_IMAGES}${image}` }
      : {}),
    openGraph: {
      publishedTime: blog.timeStamp,
      authors: ["Uniscaler"],
    },
  });
}

export default function Page() {
  return <BlogsContent />;
}
