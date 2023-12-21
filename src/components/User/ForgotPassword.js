import React, { useEffect, useState } from 'react'
import Loader from '../component/Loader/Loader';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
      );
      const [email, setEmail] = useState("");
      const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
      };
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if (message) {
          alert.success(message);
        }
      }, [dispatch, error, alert, message])
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
      
        <div className="w-screen h-screen max-w-full flex justify-center items-center fixed top-0 left-0 bg-light-grey mt-10">
          <div className="lg:w-80 lg:h-64 w-64 h-80 m-4 box-border bg-white rounded-sm">
            <h2 className="text-center lg:text-xl p-2 mt-4 m-auto border-b-2 w-48 border-gray-300">Forgot Password</h2>

            <form
              className="flex flex-col items-center m-auto lg:p-2 p-3 justify-evenly h-3/4"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="flex w-full items-center ">
                <MailOutlineIcon className="absolute lg:translate-x-4 text-gray-400 h-3 w-3 p-1" />

                <input className='pl-10 w-full text-sm rounded '
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Send"
                className="border-none w-full cursor-pointer outline-none bg-orange text-white text-sm p-2 transition-all duration-500 ease-in hover:bg-button-orange shadow-md rounded-md"
              />
            </form>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default ForgotPassword