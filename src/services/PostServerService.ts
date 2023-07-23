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

  getTrendingIssues(): Promise<{ posts: Post[] }> {
    return serverRequests.get("/api/post/trending");
  }

  getPostCount(): Promise<{
    allPostCount: number;
    resolvedPostCount: number;
    unresolvedPostCount: number;
    rejectedPostCount: number;
  }> {
    return serverRequests.get("/api/post/counts");
  }
}

const postServerService = new PostServerService();
export default postServerService;
