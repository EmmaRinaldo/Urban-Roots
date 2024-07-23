import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "../../public/banner.png";
import HelloImage from "../../public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreatePostCard } from "../components/CreatePostCard";
import prisma from "../lib/db";
import { PostCard } from "../components/PostCard";
import { Suspense } from "react";
import { SuspenseCard } from "../components/SuspenseCard";
import Pagination from "../components/Pagination";

async function getData(searchParams: string) {
  const [count, data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 10, // TODO: Après la création de post changer la pagination pour 10
      skip: searchParams ? (Number(searchParams) - 1) * 10 : 0,
      select: {
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        Comment: {
          select: {
            id: true,
          },
        },
        User: {
          select: {
            userName: true,
          },
        },
        subjectName: true,
        Vote: {
          select: {
            userId: true,
            voteType: true,
            postId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {data, count};
}

export default function ForumPage({
    searchParams
}: {
  searchParams: {page: string};
}) {

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4 mb-10">

      <div className="lg:w-[65%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>

      <div className="lg:w-[35%] w-[90%] order-1 md:order-2 mx-auto mb-5">
        <Card>
          <Image src={Banner} alt="Banner" className="h-10 w-full object-cover" />
          <div className="p-2">
            <div className="flex items-center">
              <Image src={HelloImage} alt="Hello Image" className="h-16 w-auto -mt-5" />
              <h1 className="font-medium pl-3">Forum</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Voici votre forum ! Venez ici pour vous connecter avec vos communautés préférées !
            </p>
            <Separator className="my-5" />

            <div className="flex flex-col gap-y-3">
              <Button variant={"secondary"}>
                <Link href="/subject/emmarinaldo/create">Créer un Post</Link>
              </Button>              
              <Button>
                <Link href="/subject/create">Créer un Sujet de Discussion</Link>
              </Button>
            </div>             
          </div>
        </Card>
      </div>
        
    </div>
  );
}

async function ShowItems({
  searchParams
}: {
searchParams: {page: string};
}) {
  const {count, data} = await getData(searchParams.page);
  return (
    <>
      {data.map((post) => (
          <PostCard
            id={post.id}
            imageString={post.imageString}
            jsonContent={post.textContent}
            subjectName={post.subjectName as string}
            title={post.title}
            key={post.id}
            commentAmount={post.Comment.length}
            userName={post.User?.userName as string}
            voteCount={
              post.Vote.reduce((acc, vote) => {
                if(vote.voteType === "UP") return acc + 1;
                if(vote.voteType === "DOWN") return acc - 1;

                return acc;
              }, 0)
            }
          />
        )
      )}

      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  )
}
// TODO: Ajouter tous les sujets possibles avec numéro de post dedans sur le côté droit