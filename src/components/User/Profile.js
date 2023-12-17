import React,{useEffect} from 'react'
import {useSelector} from 'react-redux';
import Loader from '../component/Loader/Loader';
import {Link, useNavigate} from "react-router-dom";

const Profile=()=>{
    const{user,loading,isAuthenticated}=useSelector(state=>state.user);
    const navigate=useNavigate();
    useEffect(() => {
        if (isAuthenticated === false) {
          navigate("/login");
        }
      }, [isAuthenticated]);
    return(
        <>
         {loading?(<Loader/>):(
            <> 
            <div className="profileContainer  flex w-screen h-screen w-full">
            <div className='flex h-screen w-screen w-full flex-col items-center justify-center'>
              <h1 className='text-xl lg:mb-5 mt-20 '>My Profile</h1>
              <img className='w-40  rounded-full'src={user.avatar.url} alt={user.name} />
              <Link to="/me/update" className='mt-5 border-none bg-text-orange text-white text-center m-1 p-1 px-10 text-sm transition-all duration-500 ease-in hover:bg-orange-700'>Edit Profile</Link>
            </div>
            <div className='flex h-screen w-screen w-full flex-col justify-evenly box-border text-center items-center lg:items-start p-1 lg:mt-16'>
              <div>
                <h4 className='text-xl font-semibold'>Full Name</h4>
                <p className='italic'>{user.name}</p>
              </div>
              <div>
                <h4 className='text-xl font-semibold'>Email</h4>
                <p className='italic'>{user.email}</p>
              </div>
          
              <div className='flex flex-col'>
                <Link to="/orders"className='border-none bg-slate-500 text-white text-center m-1 p-1 px-10 text-sm transition-all duration-500 ease-in hover:bg-slate-700' >My Orders</Link>
                <Link to="/password/update "className='border-none bg-slate-500 text-white text-center m-1 p-1 px-10 text-sm transition-all duration-500 ease-in hover:bg-slate-700'>Change Password</Link>
              </div>
            </div>
          </div></>
         )}
        </>
    )
}
export default Profile