import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'


const AddUser = () => {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(!username.trim() || !email.trim()){
            toast.error('All fields are required')
            return;
        }

        const payload = {
            name:username,
            email:email
        }


        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/add-user`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(payload)
            });

            if(!response.ok){
                throw new Error('Something went wrong')
            }

            const data = await response.json();
            // console.log(data);
            toast.success(data.msg)
            navigate('/')
        } catch (error) {
            console.log(`Error is creating user ${error}`)
            toast.error(data.msg)
            navigate('/')
        }

        
    }

  return (
    <div className='flex flex-col min-h-screen justify-center items-center ' >
        <h1>ADD USER</h1>
        <div className='flex justify-center md:w-2/4 p-3'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:w-3/4'>
                <input type="text" placeholder='Enter Username... ' value={username} onChange={(e)=>setUsername(e.target.value)} className='border rounded-2xl p-2'/>
                <input type="text"  placeholder='Enter Email....' value={email} onChange={(e)=>setEmail(e.target.value)} className='border rounded-2xl p-2 '/>
                <button type='submit' className='cursor-pointer p-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow-lg border border-blue-300 hover:from-white hover:to-white hover:text-blue-500 hover:border-blue-700 transition-all duration-300'>Add User</button>
            </form>
        </div>
    </div>
  )
}

export default AddUser