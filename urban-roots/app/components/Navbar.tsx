import Link from "next/link";
import urbanLogo from "../../public/logo-urban-roots.png";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";
import CartePage from "../carte/page";
import { NavDropdown } from "./NavDropdown";

export async function Navbar() {

    const {getUser} = getKindeServerSession()
    const user = await getUser()

    return (
        <nav className="h-[12vh] w-full flex items-center border-b px-5 lg:px-14 justify-between sticky top-0 z-50">
            <Link href="/">
                <Image 
                    src={urbanLogo}
                    alt="Urban Roots Logo"
                    className="h-[10vh] w-fit bg-white rounded-full"
                />
            </Link>

            <div className="flex items-center gap-x-4">
                
                <ThemeToggle />
                {user ? (
                    <UserDropdown userImage={user.picture} />
                ) : (
                    <div className="flex items-center gap-x-4">
                        <NavDropdown />
                        <Button variant={"secondary"} asChild>
                            <RegisterLink>S'inscrire</RegisterLink>
                        </Button>
                        <Button asChild>
                            <LoginLink>Se connecter</LoginLink>
                        </Button>
                    </div>
                )}
            
            </div>
            
            
        </nav>
    );
}