import { useEffect, useState } from "react"
import { ArrowRight, Github, Loader2, Mail } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { cart_get } from '../redux/counter/cartDetail'
import { Login,Logout } from "../redux/counter/signedIn";
export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({ emailError: "", passwordError: "" })
  const [signUpInfo, setSignUpInfo] = useState({ name:"",email: "", password: "" });
  const navigate=useNavigate()
  const signUpChange = (e) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
    setError({ emailError: "", passwordError: "" });

}
const dispatch = useDispatch()

useEffect(()=>{
    window.scrollTo({ top: 0 });
},[])
  const handleLogin = async (e) => {
    e.preventDefault()
   setIsLoading(true)
    const host = "http://localhost:5000";
        const response = await fetch(`${host}/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: signUpInfo.email, password: signUpInfo.password }),
        });
        const data = await response.json();
        setIsLoading(false)
        if (data.sucess) {
            localStorage.setItem('auth-token', data.token);
            dispatch(cart_get())
            dispatch(Login())
            navigate('/');
        }
        else {
            if (data.type === 'user') { setError({ emailError: data.error, passwordError: "" }) }
            else { setError({ emailError: "", passwordError: data.error }) }
        }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16 md:mt-2">
      <div className="relative max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-lg">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-violet-50 rounded-2xl -z-10" />
        <div
          className="absolute -top-4 -right-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-4 -left-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl"
          aria-hidden="true"
        />

        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="font-medium text-violet-600 hover:text-violet-500 transition-colors"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            {!isSignIn && (
              <div className="space-y-1">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={signUpInfo.name}
                  onChange={signUpChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div className="space-y-1">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={signUpInfo.email}
                  onChange={signUpChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
              <p className='text-sm text-red-700'>{error.emailError}</p>
            </div>
            <div className="space-y-1">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={signUpInfo.password}
                  onChange={signUpChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
              <p className='text-sm text-red-700'>{error.passwordError}</p>
            </div>
          </div>

          {isSignIn && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm font-medium text-violet-600 hover:text-violet-500 transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {isSignIn ? "Sign in" : "Sign up"}
                  <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
                </>
              )}
            </button>

            <div className="relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                variant="outline"
                className="w-full border-2 hover:bg-gray-50 transition-colors flex items-center h-10 rounded-md"
              >
                <Github className="mr-2 h-4 w-4 ml-4" />
                Github
              </button>
              <button
                type="button"
                variant="outline"
                className="w-full border-2 hover:bg-gray-50 transition-colors flex items-center h-10 rounded-md"
              >
                <Mail className="mr-2 h-4 w-4 ml-4" />
                Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

