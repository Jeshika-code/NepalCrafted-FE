import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardIcon from "@material-ui/icons/Dashboard";
import Backdrop from "@material-ui/core/Backdrop";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
import { ShoppingCart } from '@material-ui/icons';


const UserOptions = ({user}) => {
  const {cartItems}=useSelector((state)=>state.cart)
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();
   const dispatch=useDispatch();
  const alert=useAlert();
   const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: (<ShoppingCart style={{color:cartItems.length>0?"orange":"unset"}}/>), name:`Cart${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
   navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "11" }} />
  <SpeedDial  ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        direction='down'
        open={open}
       className='mt-20 fixed top-0 right-0 h-10 w-16 '
        icon={
          <img
            className="rounded-full h-8 w-16"
            src={user.avatar.url ? user.avatar.url :'/profile.jpg'}
            alt="Profile"
          />}
          >
 {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
    </SpeedDial>
    </>
  )
}

export default UserOptions