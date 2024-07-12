import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroSection from "@/components/homepage/HeroSection"
import About from "@/components/homepage/About"
import SectionCarte from "@/components/homepage/SectionCarte"
import SectionRessources from "@/components/homepage/SectionRessources"

const Home = () => {
  return (
    <>

      <Navbar />

        <HeroSection />
        <About />
        <SectionCarte />
        <SectionRessources />

      <Footer />
    
    </>
  )
}

export default Home