export function SectionRessources() {
    return(
        <section className="py-16 px-7 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-4xl font-bold mb-4">Ressources et Conseils</h2>
                    <p className="text-lg sm:text-xl">Accédez à une vaste bibliothèque de ressources et de conseils pour vous aider à réussir votre jardinage urbain. Explorez des articles, vidéos, et guides pratiques créés par des experts et des membres de la communauté.</p>
                </div>
                <div className="flex flex-col-reverse lg:flex-row items-center">
                    <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
                        <h3 className="text-3xl font-semibold mb-4">Ce que vous trouverez</h3>
                        <p className="mb-4">Notre section ressources comprend :</p>
                        <ul className="list-disc list-inside mb-4 text-black">
                            <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Articles détaillés sur les meilleures pratiques de jardinage</li>
                            <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Vidéos tutoriels pour des projets de jardinage spécifiques</li>
                            <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Guides étape par étape pour les débutants et les experts</li>
                            <li className='bg-[#e0f7e0] list-none p-3 rounded-xl my-2 font-semibold'>Conseils de la communauté pour optimiser votre espace vert</li>
                        </ul>
                        <p>Que vous soyez novice ou jardinier expérimenté, vous trouverez des informations précieuses pour chaque étape de votre projet de jardinage urbain.</p>
                        <a href="/guides" className="inline-block mt-4 px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold text-lg">Accéder aux Guides</a>
                    </div>
                    <div className="lg:w-1/2">
                        <img src="gardening-tools.jpeg" alt="Gardening tools representing resources and advice" className="bg-footer w-full rounded-lg shadow-lg object-cover h-[400px] lg:h-auto mb-5" />
                    </div>
                </div>
            </div>
        </section>
    )
}