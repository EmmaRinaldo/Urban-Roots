import React from 'react'

const About = () => {
  return (
    <section class="py-16 px-6 lg:px-8 text-black">
        <div class="container mx-auto max-w-4xl">
            <div class="text-center mb-12">
            <h2 class="text-4xl sm:text-4xl font-bold mb-4">À propos de UrbanRoots</h2>
            <p class="text-lg sm:text-xl">UrbanRoots vise à encourager le jardinage urbain collaboratif et écoresponsable. Notre plateforme permet aux citadins de se réunir pour créer et entretenir des espaces verts en milieu urbain.</p>
            </div>
            <div class="flex flex-col-reverse lg:flex-row items-center">
                <div class="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                    <h3 class="text-3xl font-bold mb-4">Nos Objectifs</h3>
                    <p class="mb-4">Nous avons pour mission de :</p>
                    <ul class="list-disc list-inside mb-4 w-fit">
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Encourager le jardinage urbain et la création d'espaces verts</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Favoriser la collaboration communautaire et l'entraide</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Améliorer la durabilité urbaine grâce à des pratiques écoresponsables</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Éduquer et sensibiliser à l'éco-responsabilité</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Faciliter l'accès aux ressources et conseils en jardinage</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Mesurer l'impact environnemental des initiatives urbaines</li>
                    </ul>
                    <p>En rejoignant UrbanRoots, vous contribuez à rendre nos villes plus vertes et à promouvoir un mode de vie durable.</p>
                </div>
                <div class="lg:w-1/2">
                    <img src="/media/community-gardening.jpeg" alt="Jardinage communautaire en zone urbaine" class="h-full rounded-lg shadow-lg mb-5" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default About