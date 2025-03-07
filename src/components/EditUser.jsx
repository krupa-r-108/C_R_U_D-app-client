import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const EditUser = () => {

    const {id} = useParams();

     const [userInfo,setUserInfo] = useState({
        name : '',
        email:''
     })
    
     const navigate = useNavigate()

      useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/get-user/${id}`);
                const data =  await response.json();
            //   console.log(data)
            setUserInfo({
                name:data.name,
                email:data.email
          })
            } catch (error) {
                console.log('Error in fetching user')
            }
          
        }
        fetchData()
    },[])
    

    const handleChange = (e) =>{
        const {name,value} = e.target;
        // console.log(e.target)
        setUserInfo((prev)=>({...prev,[name]:value}))
    }

    const handleOnSubmit = async  (e)=>{
        e.preventDefault();

        if(!userInfo.name.trim() || !userInfo.email.trim()){
            toast.error('All fields are required')
            return;
        }
        

        try {
            const response = await fetch(`http://localhost:8000/api/edit-user/${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(userInfo)
            })
            if(response.ok){
                toast.success('User updated successfully')
                navigate('/')
            }
            else{
                toast.error('Error in updating user')
            }
        } catch (error) {
            console.log(`Error is updating user ${error}`)
            toast.error('Error in updating user')
            navigate('/')
        }
            

       
    }       

  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
        <h1>EDIT USER</h1>
        <div className='flex md:w-2/4 justify-center p-3'>
            <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 md:w-3/4'>
                <input type="text" value={userInfo.name} name='name' onChange={handleChange} className='border rounded-2xl p-2'/>
                <input type="text" value={userInfo.email} name='email' onChange={handleChange} className='border rounded-2xl p-2 '/>
                <button className='border rounded-2xl p-2 cursor-pointer bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold shadow-lg border-blue-300 hover:from-white hover:to-white hover:text-blue-500 hover:border-blue-500 transition-all duration-200'>Edit</button>
            </form>
        </div>
    </div>
  )
}

export default EditUser