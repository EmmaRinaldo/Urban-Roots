import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export function NavDropdown() {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
            <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>
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

            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <Link href="/guides" className="w-full">
                    Guides Jardinages
                </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
                <Button variant={"secondary"} asChild className="w-full">
                    <RegisterLink>S&apos;inscrire</RegisterLink>
                </Button>
            </DropdownMenuItem>
            
            <DropdownMenuItem>
                <Button asChild className="w-full">
                    <LoginLink>Se connecter</LoginLink>
                </Button>
            </DropdownMenuItem>
                        
        </DropdownMenuContent>
        </DropdownMenu>
    )
}