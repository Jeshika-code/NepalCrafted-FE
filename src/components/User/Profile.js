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
            <div className=" profileContainer">
            <div>
              <h1 >My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div >
              <div>
                <h4 >Full Name</h4>
                <p className='italic'>{user.name}</p>
              </div>
              <div>
                <h4 className=''>Email</h4>
                <p className='italic'>{user.email}</p>
              </div>
          
              <div className='flex flex-col'>
                <Link to="/orders" >My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div></>
         )}
        </>
    )
}
export default Profile