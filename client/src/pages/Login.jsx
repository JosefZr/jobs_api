import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import axios from "axios"
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom"
export default function Login() {
    const [data, setData] = useState({
        email:"",
        password:""
    })
    const navigate = useNavigate();

    async function loginUser(e){
        e.preventDefault();
    
        const { email, password } = data;
      
        // Log the form data to verify
        console.log({ email, password });
      
        if ( !email || !password) {
          toast.error("All fields are required");
          return;
        }
      
        try {
          // Post the data to the backend
          const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
            email,
            password,
          }, {
            withCredentials: true
          });
          
      
          // Handle response from the server
         if (res.data.token) {
        const token = res.data.token;

        // Store the token in memory or a global state (not localStorage)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        toast.success("Successfully logged in");
        navigate("/dashboard");  // Navigate to dashboard after login
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
      console.log(err)
    }
  }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="bg-blue-500 text-white rounded-lg p-2 mb-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
                >
                <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-center">Jobster</h1>
            <h2 className="text-3xl font-semibold tracking-tight">Register</h2>
            </CardHeader>
            <CardContent>
            <form className="space-y-4" onSubmit={loginUser}>
                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" onChange={(e)=> setData({...data, email:e.target.value})} required type="email" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" required type="password" onChange={(e)=> setData({...data, password:e.target.value})}/>
                </div>
                <Button className="w-full" type="submit">
                Submit
                </Button>
                <Button className="w-full" variant="secondary" type="submit">
                Demo App
                </Button>
            </form>
            <div className="mt-4 text-center text-sm">
                Already a member?{" "}
                <a className="text-blue-500 hover:underline" href="/signup">
                register
                </a>
            </div>
            </CardContent>
        </Card>
        </div>
    )
}

// export default function Signup() {
//   return (
//     <div>Signup</div>
//   )
// }
