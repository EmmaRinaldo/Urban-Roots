"use client";
import { FcGoogle } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null
    })

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value, files } = e.target
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value
        })
    }

    console.log(formData)

    const router = useRouter()

    const [passwordMatch, setPasswordMatch] = useState(true)

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword)
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const registerForm = new FormData()
            for (var key in formData) {
                registerForm.append(key, formData[key])
            }

            const response = await fetch("/api/register/", {
                method: "POST",
                body: registerForm
            })

            if (response.ok) {
                router.push("/login");
            }
        } catch(err) {
            console.log("Erreur lors de l'inscription", err.message)
        }
    }

    const loginWithGoogle = () => {
        signIn("google", { callbackUrl: "/" });
    }

    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[#e0f7e0] p-2">

            <img src="/media/racines-arbres-register.jpeg" alt="Image de racines d'arbre" className='h-[550px] w-[300px] rounded-l-[30px] hidden md:flex'/>

            <div className="flex flex-col justify-center items-center w-[80%] gap-[15px] h-[550px] bg-black/80 md:rounded-r-[30px] md:rounded-l-none md:w-[70%] rounded-[30px] lg:w-[45%] ml:w-[50%]">

                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-[15px] w-[70%]'>

                    <input
                        className='w-full px-[15px] py-[7px] bg-transparent border-b border-b-[rgba(255,255,255,0.3)] outline-none text-center text-white placeholder-white focus:bg-transparent' 
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className='w-full px-[15px] py-[7px] bg-transparent border-b border-b-[rgba(255,255,255,0.3)] outline-none text-center text-white placeholder-white focus:bg-transparent'
                        placeholder="Email"
                        name="email"
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className='w-full px-[15px] py-[7px] bg-transparent border-b border-b-[rgba(255,255,255,0.3)] outline-none text-center text-white placeholder-white focus:bg-transparent'
                        placeholder="Mot de passe"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        className='w-full px-[15px] py-[7px] bg-transparent border-b border-b-[rgba(255,255,255,0.3)] outline-none text-center text-white placeholder-white focus:bg-transparent'
                        placeholder="Confirmer le mot de passe"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {!passwordMatch && (
                        <p className='text-red-600'>Le mot de passe est différent</p>
                    )}

                    <input 
                        className='hidden'
                        id="image" type="file" name="profileImage"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                    <label htmlFor="image" className='flex flex-col justify-center items-center gap-[9px] cursor-pointer text-white text-[14px]'>
                        <img src="/media/addImage.png" alt="ajouter image de profil" className='w-[25px]' />
                        <p>Télécharger la photo de profil</p>
                    </label>
                    {formData.profileImage && (
                        <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" className='max-w-[80px] max-h-[80px]' />
                    )}
                    <div className='text-white'>
                        <input type="checkbox" required /> J’ai lu et j’accepte les <a href="/cgu" className='underline'>conditions générales d’utilisations</a> *
                    </div>

                    <button 
                        type="submit"
                        disabled={!passwordMatch}
                        className='px-[15px] py-[10px] bg-gradient-to-r from-green-700 to-green-300 border-none text-[18px] font-semibold cursor-pointer transition duration-300 ease-linear text-white rounded-[10px] flex justify-center items-center gap-[10px] hover:shadow-[0_0_10px_3px_rgba(255,255,255,1)] w-[100%]'
                    >
                        Créer mon compte
                    </button>

                </form>

                <button 
                    onClick={loginWithGoogle}
                    className="w-[70%] px-[10px] py-[10px] bg-white border-none text-[18px] font-semibold cursor-pointer transition duration-300 ease-linear rounded-[10px] flex justify-center items-center gap-[10px] hover:shadow-[0_0_10px_3px_rgba(255,255,255,1)]"
                >
                    <p className='text-black text-[18px]'>Se connecter avec Google</p>
                    <FcGoogle />
                </button>

                <a href="/login" className='text-white text-[13px] mt-[10px] text-center hover:underline'>Vous avez déjà un compte ? Connectez-vous ici</a>

            </div>
        </div>
    )
}

export default Register