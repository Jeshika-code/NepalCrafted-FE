import React, { useState, useEffect } from "react";
import Loader from "../component/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, updatePassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Updated Successfully");

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-screen h-screen max-w-full flex justify-center items-center fixed top-0 left-0 bg-light-grey mt-10 ">
            <div className="lg:w-80 lg:h-96 w-64 h-80 m-4 box-border bg-white rounded-sm">
              <h2 className="text-center lg:text-xl p-4 m-auto border-b-2 w-48 border-gray-300">Update Password</h2>

              <form
                className="flex flex-col items-center m-auto lg:p-2 p-3 justify-evenly h-3/4"
                onSubmit={updatePasswordSubmit}
              >
                <div className="flex w-full items-center p-2">
                  <VpnKeyIcon className="absolute lg:translate-x-4 translate-x-2 h-3 w-3 p-1 text-gray-400"/>
                  <input className="lg:pl-14 pl-10  w-full text-sm rounded"
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="flex w-full items-center p-2">
                  <LockOpenIcon className="absolute lg:translate-x-4 translate-x-2 h-3 w-3 text-gray-400 p-1	"/>
                  <input className="lg:pl-14 pl-10 w-full text-sm rounded"
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex w-full items-center p-2">
                  <LockIcon className="absolute lg:translate-x-4 translate-x-2 text-gray-400 h-3 w-3 p-1	" />
                  <input className="lg:pl-14 pl-10 w-full text-sm rounded"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="border-none w-full cursor-pointer outline-none bg-orange text-white text-sm p-2 transition-all duration-500 ease-in hover:bg-button-orange shadow-md rounded-md"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
