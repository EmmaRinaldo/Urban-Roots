import React from 'react'

const SectionRessources = () => {
  return (
    <section class="py-16 px-7 lg:px-8 bg-white text-gray-800">
        <div class="container mx-auto max-w-4xl">
            <div class="text-center mb-12">
                <h2 class="text-4xl sm:text-4xl font-bold mb-4">Ressources et Conseils</h2>
                <p class="text-lg sm:text-xl">Accédez à une vaste bibliothèque de ressources et de conseils pour vous aider à réussir votre jardinage urbain. Explorez des articles, vidéos, et guides pratiques créés par des experts et des membres de la communauté.</p>
            </div>
            <div class="flex flex-col-reverse lg:flex-row items-center">
                <div class="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                    <h3 class="text-3xl font-semibold mb-4">Ce que vous trouverez</h3>
                    <p class="mb-4">Notre section ressources comprend :</p>
                    <ul class="list-disc list-inside mb-4">
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Articles détaillés sur les meilleures pratiques de jardinage</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Vidéos tutoriels pour des projets de jardinage spécifiques</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Guides étape par étape pour les débutants et les experts</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Conseils de la communauté pour optimiser votre espace vert</li>
                    </ul>
                    <p>Que vous soyez novice ou jardinier expérimenté, vous trouverez des informations précieuses pour chaque étape de votre projet de jardinage urbain.</p>
                    <a href="/guides" class="inline-block mt-4 px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold text-lg">Accéder aux Guides</a>
                </div>
                <div class="lg:w-1/2">
                    <img src="/media/gardening-tools.jpeg" alt="Gardening tools representing resources and advice" class="w-full rounded-lg shadow-lg object-cover h-[400px] lg:h-auto mb-5" />
                </div>
            </div>
        </div>
        </section>

  )
}

export default SectionRessources