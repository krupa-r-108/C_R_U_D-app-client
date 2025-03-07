import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faList, faPen } from "@fortawesome/free-solid-svg-icons";
import  { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view,setView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/get-all-users`);
        const data = await response.json();
        // console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(`Error in getting all users ${error.message}`);
        setLoading(false);
      }
    };
    fetchData();
  }, []);




  return (
    <div className="min-h-screen ">
      <h1 className="text-center mt-5 font-bold">ALL USERS</h1>
      <div className="text-center my-2">
        <button className="border rounded-2xl p-2 mx-1 cursor-pointer bg-emerald-400 text-white font-semibold hover:bg-white hover:text-emerald-400 transition-all duration-150 text-lg shadow-md border-emerald-400" onClick={()=>setView(true)}><FontAwesomeIcon icon={faList}/></button>
        <button className="border rounded-2xl p-2 mx-1 cursor-pointer bg-emerald-400 text-white font-semibold hover:bg-white hover:text-emerald-400 transition-all duration-150 text-lg shadow-md border-emerald-400" onClick={()=>setView(false)}><FontAwesomeIcon icon={faTable} /></button>
      </div>
      {
        !view &&  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 overflow-hidden">
        {loading ? (
          <Loader />
        ) : data && data.length > 0 ? (
          data.map((item) => {
            return (
              <div key={item._id} className="flex flex-col justify-between  border p-3 rounded-2xl break-words shadow-md border-gray-300 h-full">
                <h1 className="p-2"> <span className="font-semibold">Name:</span> {item.name}</h1>
                <h1 className="p-2"> <span className="font-semibold">Email:</span> {item.email}</h1>
                <div className="flex justify-around  items-center p-2">
                  <Link to={`/edit-user/${item._id}`} className="text-lg text-blue-500 hover:text-blue-700"><FontAwesomeIcon icon={faPen} /></Link>
                  <Link to={`/delete-user/${item._id}`} className="text-lg text-red-600 hover:text-red-700"><FontAwesomeIcon icon={faTrash} /></Link>
                </div>
              </div>
            );
          })
        ) : (
          <h1> No Users Found</h1>
        )}
      </div>
      }


      {/* table view */}
      {
        view && 
        <div className="">
        {
          loading ? (<Loader />) : data && data.length > 0 ?(
            <div className="overflow-x-auto">
              <table className="text-center w-full ">
                <thead className="">
                  <tr className="py-7">
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => {
                      return (
                        <tr key={item._id} className="border-b-1 border-blue-100 shadow-sm rounded-3xl">
                          <td className="p-2">{item.name}</td>
                          <td className="p-2">{item.email}</td>
                          <td className="p-2">
                            <Link to={`/edit-user/${item._id}`} className="text-lg text-blue-500 hover:text-blue-700 mx-3"><FontAwesomeIcon icon={faPen} /></Link>
                            <Link to={`/delete-user/${item._id}`} className="text-lg text-red-600 hover:text-red-700"><FontAwesomeIcon icon={faTrash} /></Link>
                          </td>
                        </tr>
                      )
                    } )
                  }
                </tbody>
              </table>
            </div>
          ) :(<h1>No Users Found </h1>) 
        }
      </div>
      }
    </div>

  );
};

export default Home;
