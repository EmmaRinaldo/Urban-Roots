import React from 'react'

const SectionCarte = () => {
  return (
    <section class="py-16 px-6 lg:px-8 bg-gray-100 text-black">
        <div class="container mx-auto max-w-4xl">
            <div class="text-center mb-12">
                <h2 class="text-4xl sm:text-4xl font-bold mb-4">Carte Interactive</h2>
                <p class="text-lg sm:text-xl">Explorez notre carte interactive pour localiser et créer des espaces de jardinage urbain près de chez vous. Participez à la transformation de votre quartier en un espace vert collaboratif.</p>
            </div>
            <div class="flex flex-col lg:flex-row items-center">
                <div class="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                    <img src="/media/map-thumbnail.png" alt="Interactive map showing urban gardening spots" class="w-full rounded-lg shadow-lg" />
                </div>
                <div class="lg:w-1/2">
                    <h3 class="text-3xl font-bold mb-4">Comment ça marche ?</h3>
                    <p class="mb-4">Notre carte interactive vous permet de :</p>
                    <ul class="list-disc list-inside mb-4">
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Localiser des jardins urbains existants</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Créer et enregistrer de nouveaux espaces de jardinage</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Rejoindre des initiatives de jardinage près de chez vous</li>
                        <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Partager des ressources et des conseils avec la communauté</li>
                    </ul>
                    <p>Commencez dès maintenant à explorer les possibilités de jardinage urbain dans votre région et connectez-vous avec d'autres passionnés de jardinage.</p>
                    <a href="/carte" class="inline-block mt-4 px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold text-lg">Voir la Carte</a>
                </div>
            </div>
        </div>
    </section>

  )
}

export default SectionCarte