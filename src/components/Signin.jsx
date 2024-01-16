import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import {bg_image} from "./Netflix_bg.jpg"
import { Link } from 'react-router-dom'
import { UserAuth } from '../Context/AuthContext';

const Signin = () => {
    const {createUser}=UserAuth();
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [error,seterror]=useState('');
    // const [userId,setUserId]=useState('');
    const navigate=useNavigate();
    const  handleclick=async (e)=>{
        e.preventDefault();
        try{
         await createUser(email,password);
         navigate("/");
        }catch(error){
        //   console.log(error);
          seterror(error.message);
        }
    }
  return (
    <>
     <div className='w-full h-screen'>
        <div className='bg-white fixed top-0 left-0 w-full h-screen'></div>
        
        <div className='fixed w-full  z-50'>
          <div className='max-w-[450px] h-[600px] mx-auto  text-white'>
            
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl text-blue-900 '>Create Your Account</h1>
              <form
                method='POST'
                onSubmit={handleclick}
                className='w-full flex flex-col py-4'
              >
                <input onChange={(e) => setemail(e.target.value)} className='p-3 my-2 bg-gray-700 rouded' type='email'
                  placeholder='Email'
                  autoComplete='email' />
                  {error ?<p className='text-red-700'>{error}</p>:null}
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  className='p-3 my-2 bg-gray-700 rouded'
                  type='password'
                  placeholder='Password'
                  autoComplete='current-password'
                />
                <button  className='bg-green-600 py-3 my-6 rounded font-bold'>
                  Sign Up
                </button>
                <div className='flex justify-between items-center text-sm text-gray-600'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className='py-8'>
                  <span className='text-gray-600'>
                    Already have an account?
                  </span>{' '}
                  <Link className="text-blue-950 " to='/Login'>Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin