import Comment from "@/types/Comment";
import { requests } from "./httpService";

class CommentService {
  createComment(
    body: Omit<Comment, "_id" | "sender">
  ): Promise<{ message: string; comment: Comment }> {
    return requests.post("/api/comment", body);
  }
  getCommentsByPostId(id: string): Promise<{ comments: Comment[] }> {
    return requests.get(`/api/comment/${id}`);
  }
}

const commentService = new CommentService();
export default commentService;
