"use client";

// Components
import { AllPostsLoader } from "@/components/loaders/all-posts-loader";
import { PostCard } from "@/components/post-card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Constants
import { allPosts } from "@/constants/posts";

// Utils
import { usePosts } from "@/hooks/usePosts";
import { PortableText } from "@portabletext/react";

export default function PostsSection() {
  const { isError, isLoading, posts } = usePosts();

  if (isLoading) {
    return <AllPostsLoader />;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <section>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 justify-center py-52 lg:py-60">
          <h1 className="font-bold text-5xl lg:text-8xl inline-block bg-gradient-to-r text-transparent bg-clip-text dark:from-gray-400 dark:via-gray-700 dark:to-gray-950 from-gray-900 via-gray-600 to-gray-300">
            {allPosts.title}
          </h1>
          <p className="text-xs lg:text-sm opacity-75">
            {allPosts.description}
          </p>
        </div>
        <div
          className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10"
          id="posts"
        >
          {posts.map((post: any, i: number) => (
            <Dialog key={i}>
              <DialogTrigger
                className={`${
                  i === 3 || i === 6 ? "lg:col-span-2" : ""
                } h-full w-full`}
              >
                <PostCard title={post.title} author={post.author} />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{post.title}</DialogTitle>
                  <DialogDescription>
                    <PortableText value={post.body} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
