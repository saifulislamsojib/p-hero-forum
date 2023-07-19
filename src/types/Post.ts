export interface PostBody {
  postBody: string;
  tags: string[];
  category: string;
  imagesOrVideos: string[];
}

interface Post extends PostBody {
  status:
    | "new"
    | "resolved"
    | "under investigation"
    | "unresolved"
    | "rejected";
  commentOff: boolean;
  commentOffBy?: "me" | "admin";
  createdAt: string;
  updatedAt: string;
  author: string;
  upvote: number;
  commentsCount: number;
  priority: "High" | "Medium" | "Low";
}

export default Post;
