import React, { useRef, useState,useEffect } from "react";
import Loader from "../component/Loader/Loader";
import { Link,useLocation,useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import "./LoginSignUpBox.css";
import {useDispatch,useSelector} from "react-redux";
import { clearErrors, login,register } from "../../actions/userActions";
import { useAlert } from "react-alert";

const LoginSignUp = ({}) => {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { error, loading,isAuthenticated } = useSelector(
        (state) => state.user
      );
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("/profile.jpg");
    const [avatarPreview, setAvatarPreview] = useState("/profile.jpg");
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm))
    };
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
      const location=useLocation();
      const redirect = location.search ? location.search.split("=")[1] : "/account";
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (isAuthenticated) {
           navigate(redirect);
          }
       
      }, [dispatch, error, alert,redirect,isAuthenticated,navigate]);
    
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };
    return (
     <>{loading?<Loader/>:
     <>
     <div className="LoginSignUpContainer">
         <div className="LoginSignUpBox mt-20 ">
             <div>
                 <div className=" logintoggle flex ">
                     <p
                         className="cursor-pointer w-full mt-2  hover:text-text-orange transition-all ml-5  lg:text-xl text-sm duration-500 ease-in "
                         onClick={(e) => switchTabs(e, "login")}
                     >
                         LOGIN
                     </p>
                     <p
                         className="cursor-pointer mt-2 hover:text-text-orange w-full lg:ml-32 ml-10 lg:text-xl text-sm transition-all duration-500 ease-in "
                         onClick={(e) => switchTabs(e, "register")}
                     >
                         REGISTER
                     </p>
                 </div>
                 <button
                     className="bg-black border-none  "
                     ref={switcherTab}
                 ></button>
             </div>
             <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                 <div className="loginEmail">
                     <MailOutlineIcon className="mr-1" />
                     <input
                         type="email"
                         placeholder="Email"
                         required
                         value={loginEmail}
                         onChange={(e) => setLoginEmail(e.target.value)}
                     />
                 </div>
                 <div className="loginPassword">
                     <LockOpenIcon className="mr-1" />
                     <input
                         type="password"
                         placeholder="Password"
                         required
                         value={loginPassword}
                         onChange={(e) => setLoginPassword(e.target.value)}
                     />
                 </div>
                 <Link
                     className="self-end text-black transition-all duration-500 ease-in hover:text-text-orange mr-2 text-sm"
                     to="/password/forgot"
                 >
                     Forget Password?
                 </Link>
                 <input type="submit" value="Login" className="loginBtn" />
             </form>
             <form
                 className="signUpForm"
                 ref={registerTab}
                 encType="multipart/form-data"
                 onSubmit={registerSubmit}
             >
                 <div className="signUpName">
                     <FaceIcon className="m-1"/>
                     <input
                         type="text"
                         placeholder="Name"
                         required
                         name="name"
                         value={name}
                         onChange={registerDataChange}
                     />
                 </div>
                 <div className="signUpEmail">
                     <MailOutlineIcon className="m-1" />
                     <input
                         type="email"
                         placeholder="Email"
                         required
                         name="email"
                         value={email}
                         onChange={registerDataChange}
                     />
                 </div>
                 <div className="signUpPassword">
                     <LockOpenIcon className="m-1" />
                     <input
                         type="password"
                         placeholder="Password"
                         required
                         name="password"
                         value={password}
                         onChange={registerDataChange}
                     />
                 </div>

                 <div id="registerImage">
                     <img src={avatarPreview} alt="Avatar Preview" />
                     <input
                         type="file"
                         name="avatar"
                         accept="image/*"
                         onChange={registerDataChange}
                     />
                 </div>
                 <input type="submit" value="Register" className="signUpBtn " />
             </form>
         </div>
     </div>
 </>}</>
    );
};

export default LoginSignUp;
