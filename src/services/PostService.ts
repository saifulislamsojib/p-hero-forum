import { PostBody } from "@/types/Post";
import { requests } from "./httpService";

class PostService {
  createPost(body: PostBody): Promise<{ message: string }> {
    return requests.post("/api/post", body);
  }
  imageOrVideoUpload(formData: FormData): Promise<{ secure_url: string }> {
    return requests.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, formData);
  }

  updatePost(body: PostBody): Promise<{ message: string }> {
    return requests.patch("/api/post", body);
  }

  deletePost(): Promise<{ message: string }> {
    return requests.delete("/api/post");
  }
}

const postService = new PostService();
export default postService;
