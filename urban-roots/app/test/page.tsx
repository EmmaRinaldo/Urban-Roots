import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileQuestion } from "lucide-react";
import GardeningSuggestions from "../components/GardeningSuggestions";


async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    }, select: {
      imageUrl: true,
      userName: true,
      gardeningSuggestions: true, // Inclure les suggestions de jardinage
    }
  });

  return data;
}

export default async function TestPage() {

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row gap-x-10 mt-4 lg:px-0 px:5 mb-10">

      <div className="lg:w-[65%] w-[90%] flex flex-col gap-y-5 order-2 md:order-1 mx-auto">
        <h2 className="text-2xl font-semibold">Votre Résultat</h2>
        {data?.gardeningSuggestions ? (
          <GardeningSuggestions suggestions={JSON.parse(data.gardeningSuggestions)} />
        ) : (
          <div className="flex min-h-[300px] justify-center flex-col items-center rounded-md border border-dashed p-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <FileQuestion className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">Vous n&apos;avez pas passer le test pour l&apos;instant</h2>
          </div>
        )}
      </div>

      <div className="lg:w-[35%] w-[90%] order-1 md:order-2 mx-auto mb-5">
        <Card>
          <div className="bg-muted p-4 font-semibold">
            <h1 className="text-xl font-medium">Notre Test</h1>
          </div>
          <div className="p-4">
            <div className="flex items-center">
              <img 
                src={data?.imageUrl ?? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                alt="avatar de l'utilisateur"
                width={60}
                height={60}
                className="rounded-full h-16 w-16"
              />
              <p className="font-medium pl-3">{data?.userName}</p>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              Voici notre test ! Découvrer quelles techniques de jardinage est la mieux pour votre situation !
            </p>
            <Separator className="my-5" />
            <div className="flex flex-col gap-y-3">
              <Link href="/test/passer">
                <Button>Passer le test</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
