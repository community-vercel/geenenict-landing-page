'use client'
import React, { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { useRouter } from "next/navigation";
import Dashboard from "./dashboard/page";
import Login from "./login/page";
const Homes = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
const [token, settoekn] = useState()
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token= localStorage.getItem('token')
    settoekn(token)
  }, [])
  
  return (
  <>
  {token ? <Dashboard/>:<Login/> }
  </>
  );
};

export default Homes;
