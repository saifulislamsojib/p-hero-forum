import CreatePost from "@/components/forum/LeftSide/CreatePost";
import FeedPosts from "@/components/forum/LeftSide/FeedPosts";
import FeedTab from "@/components/forum/LeftSide/FeedTab";
import PostFeedLoading from "@/components/forum/LeftSide/PostFeedLoading";
import PostCounts from "@/components/forum/RightSide/PostCounts";
import PostCountsLoading from "@/components/forum/RightSide/PostCountsLoading";
import TrendingIssues from "@/components/forum/RightSide/TrendingIssues";
import TrendingIssuesLoading from "@/components/forum/RightSide/TrendingIssuesLoading";
import PageProps, { SearchParams } from "@/types/PageProps";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home | P.H Forum",
};

const HomePage = ({ searchParams }: PageProps<{}, SearchParams>) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-11 gap-5">
      <div className="lg:col-span-7">
        <CreatePost />
        <FeedTab />
        <Suspense fallback={<PostFeedLoading />}>
          <FeedPosts searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="lg:col-span-4 order-1 lg:order-2">
        <Suspense fallback={<TrendingIssuesLoading />}>
          <TrendingIssues />
        </Suspense>
        <Suspense fallback={<PostCountsLoading />}>
          <PostCounts />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
