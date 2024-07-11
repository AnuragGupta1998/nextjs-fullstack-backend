import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='bg-orange-400 text-black flex flex-wrap justify-arround  items-center p-5'>

      <div className='text-4xl'>navbar</div>

      <div className=' ml-52 flex gap-5 '>

        <button className='border rounded-full px-4 py-2 bg-cyan-200 font-bold hover:bg-cyan-500'>
          <Link href={"/"}>
            Home
          </Link>
        </button>

        <button className='border rounded-full px-4 bg-cyan-200 font-bold hover:bg-cyan-500'>
          <Link href={"/signup"}>
            signup
          </Link>

        </button>

        <button className='border rounded-full px-4 bg-cyan-200 font-bold hover:bg-cyan-500'>
          <Link href={"/login"}>
            login
          </Link>

        </button>

        <button className='border rounded-full px-4 bg-cyan-200 font-bold hover:bg-cyan-500'>
          <Link href={"/verifyemail"}>
            verifyemail
          </Link>

        </button>
        <button className='border rounded-full px-4 bg-cyan-200 font-bold hover:bg-cyan-500'>
          <Link href={"/profile"}>
            profile
          </Link>

        </button>


      </div>


    </div>
  )
}

export default Navbar