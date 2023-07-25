import { SearchParams } from "@/types/PageProps";
import Post from "@/types/Post";
import { serverRequests } from "./serverHttpService";

class PostServerService {
  getFeedPost(searchParams: SearchParams): Promise<{ posts: Post[] }> {
    const url = new URLSearchParams();
    const {
      category,
      status,
      batch,
      tag,
      days,
      startDay,
      endDay,
      problemCategory,
    } = searchParams;

    if (category) {
      url.append("category", category);
    }
    if (status) {
      url.append("status", status);
    }
    if (batch) {
      url.append("batch", batch);
    }
    if (problemCategory) {
      url.append("problemCategory", problemCategory);
    }
    if (tag) {
      url.append("tag", tag);
    }
    if (days) {
      url.append("days", days);
    }
    if (startDay && endDay) {
      url.append("startDay", startDay);
      url.append("endDay", endDay);
    }

    let path = `/api/post?${decodeURI(url.toString())}`;
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
