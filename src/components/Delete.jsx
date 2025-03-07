import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const Delete = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [username, setUsername] = useState('')

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/get-user/${id}`)
                const data = await response.json();
                // console.log(data);
                setUsername(data.name)
            } catch (error) {
                console.log('Error in getting username')
            }
        }
        fetchData()
    },[])


    const handleDelete = async ()=>{
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/delete-user/${id}`,{
                method:'DELETE'
            })
            if(response.ok){
                toast.success('User Deleted')
                navigate('/')
            }
            else{
                toast.error('User deletion failed')
            }
        } catch (error) {
            console.log('Error in deleting user')
        }
    }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
        <h1 className='text-2xl text-red-500 '>DELETE ?</h1>
        <h1 className='text-lg'>Are you sure you want to delete user ? <span className='font-bold'>{username}</span> </h1>
        <div className='w-1/2 text-center p-4'>
            <button onClick={handleDelete} className='border text-white bg-red-600 p-3 mx-4 cursor-pointer hover:bg-white hover:text-red-600 font-bold rounded-2xl transition-all duration-200'>Yes</button>
            <button onClick={()=>navigate('/')} className='border p-3 mx-4 cursor-pointer rounded-2xl font-bold hover:bg-gray-300 transition-all duration-200'>No</button>
        </div>
    </div>
  )
}

export default Delete