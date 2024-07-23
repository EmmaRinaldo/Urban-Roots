import { handleVote } from "@/app/actions";
import { CommentForm } from "@/app/components/CommentForm";
import { CopyLink } from "@/app/components/CopyLink";
import { RenderToJson } from "@/app/components/RendertoJson";
import { DownVote, UpVote } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cake, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(id: string) {
  noStore();
  const data = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      createdAt: true,
      title: true,
      imageString: true,
      textContent: true,
      subjectName: true,
      id: true,
      Vote: {
        select: {
          voteType: true,
        },
      },
      Comment: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          User: {
            select: {
              imageUrl: true,
              userName: true,
            },
          },
        },
      },
      Subjectforum: {
        select: {
          name: true,
          createdAt: true,
          description: true,
        },
      },
      User: {
        select: {
          userName: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4 lg:px-0 px:5 mb-100">
      <div className="lg:w-[70%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto">
        <Card className="p-2 flex">
          <div className="flex flex-col  items-center  gap-y-2  p-2">
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="UP" />
              <input type="hidden" name="postId" value={data.id} />
              <UpVote />
            </form>
            {data.Vote.reduce((acc, vote) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;

              return acc;
            }, 0)}
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="DOWN" />
              <input type="hidden" name="postId" value={data.id} />
              <DownVote />
            </form>
          </div>

          <div className="p-2 w-full">
            <p className="text-xs text-muted-foreground">
              Posté par {data.User?.userName}
            </p>

            <h1 className="font-medium mt-1 text-lg">{data.title}</h1>

            {data.imageString && (
              <Image
                src={data.imageString}
                alt="Image du Post"
                width={500}
                height={400}
                className="w-full h-auto object-contain mt-2"
              />
            )}

            {data.textContent && <RenderToJson data={data.textContent} />}

            <div className="flex gap-x-5 items-center mt-3">
              <div className="flex items-center gap-x-1">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground font-medium text-xs">
                  {data.Comment.length} Commentaires
                </p>
              </div>

              <CopyLink id={params.id} />
            </div>

            <CommentForm postId={params.id} />

            <Separator className="my-5" />

            <div className="flex flex-col gap-y-7">
              {data.Comment.map((item) => (
                <div key={item.id} className="flex flex-col">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        item.User?.imageUrl
                          ? item.User.imageUrl
                          : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                      }
                      className="w-7 h-7 rounded-full"
                      alt="Avatar of user"
                    />

                    <h3 className="text-sm font-medium">
                      {item.User?.userName}
                    </h3>
                  </div>

                  <p className="ml-10 text-secondary-foreground text-sm tracking-wide">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

        <div className="lg:w-[30%] w-[90%] order-1 md:order-2 mx-auto mb-5">
            <Card>
                <div className="bg-muted p-4 font-semibold">
                    A propos
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-x-3">
                        <Image 
                            src={`https://avatar.vercel.sh/${data?.subjectName}`} 
                            alt="Image du sujet"
                            width={60}
                            height={60}
                            className="rounded-full h-16 w-16"
                        />
                        <Link href={`/subject/${data?.subjectName}`} className="font-medium">
                            {data?.subjectName}
                        </Link>
                    </div>

                    <p className="text-sm font-normal text-secondary-foreground mt-2">
                        {data?.Subjectforum?.description}
                    </p>

                    <div className="flex items-center gap-x-2 mt-4">
                        <Cake className="h-5 w-5 text-muted-foreground"/>
                        <p className="text-muted-foreground font-medium text-sm">
                            Créer le : {new Date(data?.createdAt as Date).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                            })}
                        </p>
                    </div>
                    <Separator className="my-5"/>
                    <Button asChild className="rounded-full w-full">
                        <Link href={`/subject/${data?.subjectName}/create`}>Créer un Post</Link>
                    </Button>
                        
                </div>
            </Card>
        </div>
    </div>
  );
}