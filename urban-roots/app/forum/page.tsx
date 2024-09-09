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
import {unstable_noStore as noStore} from "next/cache";
import { FileQuestion } from "lucide-react";

async function getData(searchParams: string) {
  noStore();


  const [count, data, subjectforum] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
      take: 10,
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
    prisma.subjectforum.findMany({
      select: {
        id: true,
        name:true,
        createdAt: true,
      }
    })
  ]);

  
  return {data, count, subjectforum};
}

export default async function ForumPage({
    searchParams
}: {
  searchParams: {page: string};
}) {

  const { subjectforum } = await getData(searchParams.page);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4 mb-10">

      <div className="lg:w-[65%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto">
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
              <Button>
                <Link href="/subject/create">Créer un Sujet de Discussion</Link>
              </Button>
            </div>   
       
          </div>
        </Card>

        <Card className="mt-5">
          <div className="p-2">
            <div className="flex items-center">
              <h1 className="font-medium pl-3">Sujets de Discussions</h1>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Voici tous nos sujet de discussions actuelles
            </p>
            <Separator className="my-5" />
            {subjectforum?.length === 0 ? (

              <p className="text-sm text-muted-foreground pt-2">Aucun sujet à afficher</p>

            ): (

              <ul className="list-none p-0">
                {subjectforum.map((subject: any) => (
                  <li key={subject.id} className="py-1">
                    <Link href={`/subject/${subject.name}`} className="text-sm text-muted-foreground hover:underline hover:text-primary">
                      {subject.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
            )}  
       
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

  // Ajout d'une vérification pour les données nulles ou vides
  if (!data || data.length === 0) {
    return <p>Aucun post à afficher</p>; // Gérer le cas où les données sont nulles ou vides
  }


  return (
    <>
      {data.map((post) => (
          <PostCard
            id={post.id}
            imageString={post.imageString}
            jsonContent={post.textContent ?? {}}
            subjectName={post.subjectName as string}
            title={post.title}
            key={post.id}
            commentAmount={post.Comment.length || 0 }
            userName={post.User?.userName || 'Utilisateur inconnu'}
            voteCount={
              post.Vote.reduce((acc, vote) => {
                if(vote.voteType === "UP") return acc + 1;
                if(vote.voteType === "DOWN") return acc - 1;

                return acc;
              }, 0) || 0
            }
          />
        )
      )}

      <Pagination totalPages={Math.ceil(count / 10)} />
    </>
  )
}
// TODO: Ajouter tous les sujets possibles avec numéro de post dedans sur le côté droit