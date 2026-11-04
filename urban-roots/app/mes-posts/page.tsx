import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { DeletePostButton } from "../components/DeletePostButton";
import Pagination from "../components/Pagination";

const POSTS_PER_PAGE = 10;

async function getUserPosts(userId: string, page: number) {
  noStore();
  const count = await prisma.post.count({ where: { userId } });
  const posts = await prisma.post.findMany({
    where: { userId },
    take: POSTS_PER_PAGE,
    skip: (page - 1) * POSTS_PER_PAGE,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      subjectName: true,
      createdAt: true,
      Vote: { select: { voteType: true } },
      Comment: { select: { id: true } },
    },
  });

  return { count, posts };
}

export default async function MesPostsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const page = Math.max(1, Number(searchParams.page) || 1);
  const { count, posts } = await getUserPosts(user.id, page);
  const totalPages = Math.ceil(count / POSTS_PER_PAGE);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col mt-4 mb-10 px-4">
      <h1 className="text-3xl font-extrabold tracking-tight">Mes posts</h1>
      <p className="text-muted-foreground text-sm mb-4">
        {count} post{count > 1 ? "s" : ""} publié{count > 1 ? "s" : ""}
      </p>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Vous n&apos;avez pas encore publié de post.{" "}
          <Link href="/forum" className="text-primary hover:underline">
            Aller sur le forum
          </Link>
        </p>
      ) : (
        <div className="flex flex-col gap-y-3">
          {posts.map((post) => {
            const upVotes = post.Vote.filter((v) => v.voteType === "UP").length;
            const downVotes = post.Vote.filter((v) => v.voteType === "DOWN").length;

            return (
              <Card key={post.id} className="p-4 flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                  {post.subjectName && (
                    <Link href={`/subject/${post.subjectName}`} className="font-semibold text-foreground hover:text-primary">
                      {post.subjectName}
                    </Link>
                  )}
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <Link href={`/post/${post.id}`} className="font-medium text-lg hover:text-primary">
                  {post.title}
                </Link>

                <div className="flex items-center gap-x-5 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-x-1">
                    <ThumbsUp className="h-4 w-4" /> {upVotes}
                  </span>
                  <span className="flex items-center gap-x-1">
                    <ThumbsDown className="h-4 w-4" /> {downVotes}
                  </span>
                  <span className="flex items-center gap-x-1">
                    <MessageCircle className="h-4 w-4" /> {post.Comment.length} Commentaires
                  </span>
                  <div className="ml-auto">
                    <DeletePostButton postId={post.id} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
