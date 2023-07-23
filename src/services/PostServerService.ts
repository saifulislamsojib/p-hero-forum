import Post from "@/types/Post";
import { serverRequests } from "./serverHttpService";

class PostServerService {
  getFeedPost(category?: string): Promise<{ posts: Post[] }> {
    let path = "/api/post";
    if (category) {
      path += `?category=${category}`;
    }
    return serverRequests.get(path);
  }
}

const postServerService = new PostServerService();
export default postServerService;
