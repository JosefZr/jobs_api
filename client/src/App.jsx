import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"
import { Toaster } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL="http://localhost:3000";
axios.defaults.withCredentials=true;
export default function App() {
  return (
    <>
    <Toaster position="center" toastOptions={{duration:2000, }}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
