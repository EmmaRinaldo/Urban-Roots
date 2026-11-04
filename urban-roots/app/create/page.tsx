import { CreatePostClient } from "@/app/components/CreatePostClient";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function CreatePostPage() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/api/auth/login");
    }

    const subjects = await prisma.subjectforum.findMany({
        select: { name: true },
        orderBy: { name: "asc" },
    });

    return <CreatePostClient subjects={subjects.map((s) => s.name)} />;
}
