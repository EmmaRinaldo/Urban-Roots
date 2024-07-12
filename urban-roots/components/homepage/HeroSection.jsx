import React from 'react'

const HeroSection = () => {
  return (
    <div class="relative bg-gray-800 text-white h-[500px]">
        <img src="/media/urban-rooftop-garden.jpeg" alt="Urban rooftop garden with city skyline at sunrise" class="absolute inset-0 w-full h-full object-cover opacity-50"></img>

        <div class="relative container mx-auto py-16 px-6 lg:px-20">
            <div class="max-w-3xl mx-auto text-center">
                <h1 class="text-5xl sm:text-5xl lg:text-6xl font-bold mb-6">Cultivons la Ville Ensemble</h1>
                <p class="text-lg sm:text-xl mb-8">Rejoignez la communauté UrbanRoots pour un jardinage urbain collaboratif et écoresponsable.</p>
                <a href="/register" class="inline-block px-8 py-3 bg-green-700 border-none text-[18px] cursor-pointer transition duration-300 ease-linear text-white rounded-[10px] font-semibold text-lg hover:shadow-[0_0_10px_3px_rgba(255,255,255,1)]">Rejoignez la Communauté</a>
            </div>
        </div>
        
    </div>

  )
}

export default HeroSection