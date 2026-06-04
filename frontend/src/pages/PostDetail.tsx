import { ErrorState } from "@/components/error-state";
import { PostDetailSkeleton } from "@/components/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/lib/api";
import { usePost, useStreamingAI } from "@/hooks";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router";

export function PostDetail() {
  const { id = "" } = useParams();
  const { data: post, isPending, isError, error, refetch } = usePost(id);
  const summary = useStreamingAI(apiUrl("/api/ai/summarize"));
  const ask = useStreamingAI(apiUrl("/api/ai/ask"));
  const [question, setQuestion] = useState("");

  if (isPending) return <PostDetailSkeleton />;

  if (isError || !post) {
    return (
      <ErrorState
        title="Post not found"
        message={error?.message ?? "This post may have been moved or removed."}
        onRetry={() => refetch()}
      />
    );
  }

  const handleAsk = (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim() || ask.isStreaming) return;
    ask.run({ id, question });
  };

  const paragraphs = post.content
    .trim()
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
        <Link to="/">
          <ArrowLeft /> Back to posts
        </Link>
      </Button>

      <header className="space-y-3">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span aria-hidden>·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <Badge variant="secondary">{post.readingTime} min read</Badge>
        </div>
      </header>

      <div className="space-y-3">
        <Button
          variant="outline"
          onClick={() => summary.run({ id })}
          disabled={summary.isStreaming}
        >
          <Sparkles />
          {summary.isStreaming ? "Summarizing…" : "Summarize this post"}
        </Button>
        {(summary.output || summary.error) && (
          <Card>
            <CardContent className="text-sm whitespace-pre-wrap">
              {summary.error ? (
                <span className="text-destructive">{summary.error}</span>
              ) : (
                summary.output
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-4 leading-7">
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ask about this post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <form onSubmit={handleAsk} className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What are the key takeaways?"
            />
            <Button
              type="submit"
              disabled={ask.isStreaming || !question.trim()}
            >
              {ask.isStreaming ? "Asking…" : "Ask"}
            </Button>
          </form>
          {(ask.output || ask.error) && (
            <div className="rounded-lg bg-muted p-3 text-sm whitespace-pre-wrap">
              {ask.error ? (
                <span className="text-destructive">{ask.error}</span>
              ) : (
                ask.output
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
