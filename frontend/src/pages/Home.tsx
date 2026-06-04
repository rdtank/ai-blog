import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { PostListSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePosts } from "@/hooks";
import { formatDate } from "@/lib/utils";
import { Link } from "react-router";

export function Home() {
  const { data: posts, isPending, isError, error, refetch } = usePosts();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Latest posts
        </h1>
        <p className="text-sm text-muted-foreground">
          Articles on React, TypeScript, and AI-powered apps.
        </p>
      </div>

      {isPending ? (
        <PostListSkeleton />
      ) : isError ? (
        <ErrorState
          title="Couldn't load posts"
          message={error.message}
          onRetry={() => refetch()}
        />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          message="Check back soon for new articles."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`} className="group">
              <Card className="h-full transition-shadow hover:ring-foreground/20">
                <CardHeader>
                  <CardTitle className="group-hover:underline">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.author} · {formatDate(post.publishedAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="line-clamp-3 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <Badge variant="secondary">{post.readingTime} min read</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
