import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

interface iAppProps {
    userImage: string | null;
}

export function UserDropdown({ userImage }: iAppProps ) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>

                <img 
                    src={userImage ?? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                    alt="avatar de l'utilisateur"
                    className="rounded-full h-8 w-8 hidden lg:block" 
                />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>
                <Link href="/carte" className="w-full">
                    Carte des Jardins
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Link href="/forum" className="w-full">
                    Forum
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href="/subject/create" className="w-full">
                    Créer un Sujet de Discussion
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href="/create" className="w-full">
                    Créer un Post
                </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <Link href="/test" className="w-full">
                    Test
                </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <Link href="/guides" className="w-full">
                    Guides Jardinages
                </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <Link href="/settings" className="w-full">
                    Paramètres
                </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <LogoutLink className="w-full">
                    Se déconnecter
                </LogoutLink>
            </DropdownMenuItem>
        </DropdownMenuContent>

        
    </DropdownMenu>
  )
}