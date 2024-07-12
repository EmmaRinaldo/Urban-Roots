"use client";
import { Menu, Person } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { useState } from 'react'

const Navbar = () => {
    const { data: session } = useSession()
    const user = session?.user

    console.log(user)

    const [dropdownMenu, setDropdownMenu] = useState(false)

  return (
    <div className='py-[15px] px-[70px] pb-[30px] flex justify-between items-center relative sm:px-20 sm:py-[10px]'>
        <a href="/">
            <img src="/media/logo-urban-roots.png" alt="Logo Urban Roots" className='w-[100px] cursor-pointer' />
        </a>

        <div className='flex items-center gap-[20px] sm:gap-0'>
            <button
                onClick={() => setDropdownMenu(!dropdownMenu)}
                className='flex items-center border-none gap-[10px] bg-white cursor-pointer'
            >
                <Menu sx={{ color: "gray" }}/>
                {!user ? (
                    <Person sx={{ color: "gray" }}/>
                ) : (
                    <img src={user.profileImagePath} alt="profile" className='bg-cover rounded-[50%] w-[40px] h-[40px]' />
                )}
            </button>

            {dropdownMenu && !user && (
                <div className='absolute bg-white right-[50px] sm:top-[100px] top-[115px] flex flex-col w-[200px] py-[10px] border border-gray-200 rounded-[20px] shadow-md z-[9999] sm:right-20'>
                    <Link href="/a-propos" className='px-[15px] py-[8px] text-black font-bold cursor-pointer hover:text-[#7ab46e] hover:bg-[rgba(217,213,213,0.2)]'>A propos</Link>
                    <Link href="/login" className='px-[15px] py-[8px] text-black font-bold cursor-pointer hover:text-[#7ab46e] hover:bg-[rgba(217,213,213,0.2)]'>Se connecter</Link>
                    <Link href="/register" className='px-[15px] py-[8px] text-black font-bold cursor-pointer hover:text-[#7ab46e] hover:bg-[rgba(217,213,213,0.2)]'>S'inscrire</Link>
                </div>
            )}

            {dropdownMenu && user && (
                <div className='absolute bg-white right-[50px] sm:top-[100px] top-[115px] flex flex-col w-[200px] py-[10px] border border-gray-200 rounded-[20px] shadow-md z-[9999] sm:right-20'>
                    <Link className='px-[15px] py-[8px] text-black font-bold cursor-pointer hover:text-[#7ab46e] hover:bg-[rgba(217,213,213,0.2)]' href="/a-propos">À propos</Link>
                    <Link className='px-[15px] py-[8px] text-black font-bold cursor-pointer hover:text-[#7ab46e] hover:bg-[rgba(217,213,213,0.2)]' href="/profile">Mon compte</Link>
                    <Link className='px-[15px] py-[8px] text-black font-bold cursor-pointer hover:text-[#7ab46e] hover:bg-[rgba(217,213,213,0.2)]' href="/carte-jardins">Carte des Jardins</Link>
                    <Link className='px-[15px] py-[8px] text-black font-bold cursor-pointer hover:text-[#7ab46e] hover:bg-[rgba(217,213,213,0.2)]' href="/forum">Forum</Link>
                    <Link className='px-[15px] py-[8px] text-black font-bold cursor-pointer hover:text-[#7ab46e] hover:bg-[rgba(217,213,213,0.2)]' href="/guides">Guides Jardinage</Link>
                    <a href="" className='px-[15px] py-[8px] text-red-600 font-bold cursor-pointer hover:text-red-800 hover:bg-[rgba(217,213,213,0.2)]'>Se déconnecter</a>

                </div>
            )}

        </div>

    </div>
  )
}

export default Navbar