import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="w-[100%] footer-part flex md:flex-row flex-col gap-10 justify-between items-center mt-[2px] px-6 sm:px-16 bg-[#e0f7e0] py-20 bottom-0 left-0 right-0">
      <div className="flex flex-col">
        <a href="/">
            <img src="/media/logo-urban-roots.png" alt="Logo Urban Roots" className='bg-white rounded-[50%] w-[200px] cursor-pointer' />
        </a>
        
        
      </div>


      <div className=" flex flex-col">
        <Link href="/a-propos" className="underline sm:mt-15 font-semibold">
            À PROPOS
        </Link>
        <Link href="/politique-de-confidentialite" className="underline sm:mt-15 font-semibold">
          POLITIQUE DE CONFIDENTIALITÉ
        </Link>
        <Link href="/cgu" className="underline sm:mt-15 font-semibold">
          CGU
        </Link>
        <Link href="/mention-legales" className="underline sm:mt-15 font-semibold">
          MENTION LÉGALES
        </Link>
        <p className="sm:mt-15 font-semibold">
          @E-RINALDO 2024. Tous droits réservés.
        </p>
      </div>
    </div>
  )
}

export default Footer