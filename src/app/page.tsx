import CreatePost from "@/components/forum/LeftSide/CreatePost";
import FeedPosts from "@/components/forum/LeftSide/FeedPosts";
import FeedTab from "@/components/forum/LeftSide/FeedTab";
import PageProps from "@/types/PageProps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | P.H Forum",
};

const HomePage = ({
  searchParams: { category },
}: PageProps<{}, { category: string }>) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-9 gap-5">
      <div className="md:col-span-6">
        <CreatePost />
        <FeedTab />
        <FeedPosts category={category} />
      </div>
      <div className="md:col-span-3">Top Issue/Trending Issue</div>
    </div>
  );
};

export default HomePage;
