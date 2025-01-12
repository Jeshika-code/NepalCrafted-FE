import React, {  useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";

import { getAllUsers,clearErrors, deleteUser } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";


const UserList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate();
   
    const { error,users } = useSelector((state) => state.allUsers);
    const {
      error: deleteError,
      isDeleted,
      message,
    } = useSelector((state) => state.profile);
 
  
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      } 
        if (isDeleted) {
          alert.success(message);
          navigate("/admin/users");
          dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers());
      }, [dispatch, alert, navigate,deleteError,isDeleted,error,message]);
    
    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.5 },
        {
          field: "email",
          headerName: "Email",
          minWidth: 200,
          flex: 0.6,
        },
        {
          field: "name",
          headerName: "Name",
          minWidth: 150,
          flex: 0.3,
        },
        {
          field: "role",
          headerName: "Role",
        //   type: "number",
          minWidth: 200,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link>
                <Button  onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
                >
                  <DeleteIcon />
                </Button>
              </>
            );
          },
        },
      ];
      const rows = [];

      users &&
        users.forEach((item) => {
          rows.push({
            id: item._id,
            role: item.role,
            email: item.email,
            name: item.name,
          });
        });
  return (
    <>
    <div className="dashboard mt-10 ">
        <SideBar />
        <div className="productListContainer ">
          <h1 className="productListHeading lg:mt-10 lg:p-2  lg:m-2 text-center text-xl userheading">All Users</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div></>
  )
}


export default UserList