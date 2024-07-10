'use client';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import axios from 'axios'


function Login() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  //checks applied on email username and password their length should be greater than 0
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);  //now signup button clickable
    } else {
      setButtonDisabled(true);
    }

  }, [user])

  //using useRouter for navigating to other route
  const router = useRouter()

  const onLogin = async () => {
    try {

      setLoading(true);

      //sending data to backend route when clicked on signup button
      const respose = await axios.post('/api/users/login',user)
      console.log("signup success", respose.data)

      //navigation to login route frontend
      router.push("/profile");

    } catch (error: any) {
      console.log("Login faild", error.message);

      toast.error(error.message);

    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">

        {buttonDisabled ? "No login" : "Login"}

      </button>
      <Link href="/signup">Visit Signup page</Link>

    </div >

  )
}

export default Login