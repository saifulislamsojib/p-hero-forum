import User from "./User";

export interface PostBody {
  postBody: string;
  tags: string[];
  category: string;
  imagesOrVideos: string[];
}

interface Post extends PostBody {
  _id: string;
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
  author: User;
  upvote: number;
  commentsCount: number;
  priority: "High" | "Medium" | "Low";
}

export default Post;
