import PostCard from "@/components/PostCard";
export default function Home() {

  return (
    <div className="flex flex-col gap-10 items-center w-full pt-10">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
