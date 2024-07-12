"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });

            if(response.ok) {
                router.push("/")
            }

            if (response.error) {
                setError("Email ou mot de passe incorrect. Veuillez réessayer.")
            }
        } catch (err) {
            console.log(err)
        }
    }


    const loginWithGoogle = () => {
        signIn("google", { callbackUrl: "/" });
    }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-[#f5f5dc] p-2">

        <img src="/media/racines-arbres-login.jpeg" alt="Image de racines avec quelqu'un qui les arrosent" className='h-[550px] w-[300px] rounded-l-[30px] hidden md:flex'/>

        <div className="flex flex-col justify-center items-center w-[80%] gap-[15px] h-[550px] bg-black/80 md:rounded-r-[30px] md:rounded-l-none md:w-[70%] rounded-[30px] lg:w-[45%] ml:w-[50%]">

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[15px] w-[70%]">

                <input
                    className="w-full px-[15px] py-[7px] bg-transparent border-b border-b-[rgba(255,255,255,0.3)] outline-none text-center text-white placeholder-white focus:bg-transparent"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="w-full px-[15px] py-[7px] bg-transparent border-b border-b-[rgba(255,255,255,0.3)] outline-none text-center text-white placeholder-white focus:bg-transparent"
                    placeholder="Mot de passe"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-600">{error}</p>}

                <button type="submit" className="px-[15px] py-[10px] bg-gradient-to-r from-green-700 to-green-300 border-none text-[18px] font-semibold cursor-pointer transition duration-300 ease-linear text-white rounded-[10px] flex justify-center items-center gap-[10px] hover:shadow-[0_0_10px_3px_rgba(255,255,255,1)] w-[100%]">
                    S'identifier
                </button>

            </form>
            <button 
                onClick={loginWithGoogle}
                className="w-[70%] px-[10px] py-[10px] bg-white border-none text-[18px] font-semibold cursor-pointer transition duration-300 ease-linear rounded-[10px] flex justify-center items-center gap-[10px] hover:shadow-[0_0_10px_3px_rgba(255,255,255,1)]"
            >
                <p className='text-black text-[18px]'>Se connecter avec Google</p>
                <FcGoogle />
            </button>

            <a href="/register" className='text-white text-[13px] mt-[10px] text-center hover:underline'>Vous n'avez pas de compte ? Inscrivez-vous ici</a>

        </div>
        
    </div>
  )
}

export default Login