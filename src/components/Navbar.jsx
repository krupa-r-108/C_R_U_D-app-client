import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faHouseUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

  const navigate = useNavigate()
  
  return (
    <div className='flex justify-around items-center p-2'>
        <div>
            <h1 onClick={()=>navigate('/')} className='cursor-pointer text-2xl hover:text-blue-500 '><FontAwesomeIcon icon={faHouseUser} /></h1>
        </div>
        <Link to={'/create-user'} className='cursor-pointer text-2xl  hover:text-blue-500'><FontAwesomeIcon icon={faUserPlus} /></Link>
      
    </div>
  )
}

export default Navbar