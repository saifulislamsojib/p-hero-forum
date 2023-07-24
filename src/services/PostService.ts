import Post, { PostBody } from "@/types/Post";
import { requests, simpleRequest } from "./httpService";

class PostService {
  createPost(body: PostBody): Promise<{ message: string }> {
    return requests.post("/api/post", body);
  }
  imageOrVideoUpload(formData: FormData): Promise<{
    secure_url: string;
    asset_id: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
  }> {
    return simpleRequest.post(
      process.env.NEXT_PUBLIC_CLOUDINARY_URL!,
      formData
    );
  }

  updatePost(
    id: string,
    body: PostBody
  ): Promise<{ message: string; isUpdated: boolean }> {
    return requests.patch(`/api/post/${id}`, body);
  }

  updateAdminPost(
    id: string,
    body: Pick<Post, "category" | "status" | "note" | "tags" | "priority">
  ): Promise<{ message: string; isUpdated: boolean }> {
    return requests.patch(`/api/post/updateByAdmin/${id}`, body);
  }

  updateStatusPost(
    id: string,
    body: Pick<Post, "status">
  ): Promise<{ message: string }> {
    return requests.patch(`/api/post/status/${id}`, body);
  }

  commentOfPost(
    id: string,
    body: { commentOff: boolean }
  ): Promise<{ message: string }> {
    return requests.patch(`/api/post/commentOff/${id}`, body);
  }

  deletePost(id: string): Promise<{ message: string; deletedCount: number }> {
    return requests.delete(`/api/post/${id}`);
  }
  upvotePost(id: string): Promise<{ message: string }> {
    return requests.patch(`/api/post/upvote/${id}`, {});
  }
}

const postService = new PostService();
export default postService;
