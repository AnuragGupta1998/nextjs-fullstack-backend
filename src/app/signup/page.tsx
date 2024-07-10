'use client';

import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import Link from 'next/link';

function Signup() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)

  const [loading, setLoading] = useState(false)

  //checks applied on email username and password their length should be greater than 0
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);  //noe signup button clickable
    } else {
      setButtonDisabled(true);
    }

  }, [user])

  //using useRouter for navigating to other route
  const router = useRouter()

  const onSignup = async () => {
    try {

      setLoading(true);

      //sending data to backend route when clicked on signup button
      const respose = await axios.post('/api/users/signup',user)
      console.log("signup success", respose.data)

      //navigation to login route frontend
      router.push("/login");

    } catch (error: any) {
      console.log("signup faild", error.message);

      toast.error(error.message);

    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
       
      <label htmlFor="username">username</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })} //only changing username field
        placeholder="username"
      />

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
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">

        {buttonDisabled ? "No signup" : "Signup"}

      </button>
      <Link href="/login">Visit login page</Link>

    </div >

  )
}

export default Signup