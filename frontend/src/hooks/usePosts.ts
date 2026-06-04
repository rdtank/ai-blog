import { apiUrl } from "@/lib/api";
import type { Post, PostSummary } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function usePosts() {
  return useQuery<PostSummary[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch(apiUrl("api/posts"));
      if (!res.ok) throw new Error("Failed to load posts");
      return res.json();
    },
  });
}

export function usePost(id: string) {
  return useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(apiUrl(`api/posts/${id}`));
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    },
    enabled: Boolean(id),
  });
}
