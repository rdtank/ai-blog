import { Request, Response, Router } from "express";
import { posts } from "../data/post";
import { rateLimitter } from "../middleware";

const postRouter = Router();

postRouter.get("/posts", rateLimitter, (_req: Request, res: Response) => {
  res.json(posts.map(({ content, ...rest }) => rest));
});

postRouter.get("/posts/:id", rateLimitter, (req: Request, res: Response) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

export { postRouter };
