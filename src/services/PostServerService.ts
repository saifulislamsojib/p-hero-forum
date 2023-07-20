import Post from "@/types/Post";
import { serverRequests } from "./serverHttpService";

class PostServerService {
  getFeedPost(category: string): Promise<{ posts: Post[] }> {
    return serverRequests.get(`/api/post?category=${category}`);
  }
}

const postServerService = new PostServerService();
export default postServerService;
